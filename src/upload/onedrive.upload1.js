import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import querystring from "querystring";

const clientId = "694b6b04-c401-4e85-9a81-fe78f223dede";  // Replace with your client ID
const clientSecret = "RzQ8Q~g1wc8noN9nWb.esrXc~A_aEG1hJUYEdcm~";  // Replace with your client secret
const redirectUri = "http://localhost:3000/callback";  // Replace with your redirect URI
const tenantId = "850aa78d-94e1-4bc6-9cf3-8c11b530701c";  // Use 'common' for multi-tenant, or your specific tenant ID

const app = express();
const port = 3000;

app.get("/login", (req, res) => {
    const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?` + 
        querystring.stringify({
            client_id: clientId,
            response_type: "code",
            redirect_uri: redirectUri,
            response_mode: "query",
            scope: "https://graph.microsoft.com/Files.ReadWrite offline_access",
            state: "12345"
        });
    res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
    const code = req.query.code;
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const body = new URLSearchParams({
        client_id: clientId,
        scope: "https://graph.microsoft.com/Files.ReadWrite offline_access",
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        client_secret: clientSecret
    });

    const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
        res.send(`Error: ${tokenData.error_description}`);
    } else {
        const accessToken = tokenData.access_token;
        const refreshToken = tokenData.refresh_token;
        res.send(`Access Token: ${accessToken}<br>Refresh Token: ${refreshToken}<br><a href="/upload?token=${accessToken}">Upload File</a>`);
    }
});

app.get("/upload", async (req, res) => {
    const accessToken = req.query.token;
    const filePath = path.resolve("./file.pdf");

    if (!fs.existsSync(filePath)) {
        res.send(`File not found: ${filePath}`);
        return;
    }

    const file = fs.createReadStream(filePath);
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${path.basename(filePath)}:/content`;

    const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/octet-stream"
        },
        body: file
    });

    const uploadData = await uploadResponse.json();

    if (uploadResponse.ok) {
        const fileLink = uploadData.webUrl;
        console.log(fileLink);
        res.send(`File uploaded successfully: ${JSON.stringify(uploadData)}`);
    } else {
        res.send(`Error uploading file: ${uploadData.error.message}`);
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
