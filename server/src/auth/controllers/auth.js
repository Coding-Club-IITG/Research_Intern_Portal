import dotenv from "dotenv";
import querystring from "querystring";
import jwt from "jsonwebtoken";
import { roles } from "../../utils/roles.js";
import { createUser, getUserFromToken } from "../../users/controller.js";
import { User } from "../../users/model.js";
dotenv.config();

export const onedriveLogin = async (req, res) => {
  try {
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const redirectUri = process.env.AZURE_REDIRECT_URI;
    const tenantId = process.env.AZURE_TENANT_ID;

    const authUrl =
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?` +
      querystring.stringify({
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        response_mode: "query",
        scope: "https://graph.microsoft.com/Files.ReadWrite https://graph.microsoft.com/User.Read offline_access",
        state: req.body.role, // we have to change this
      });
      console.log(authUrl)
    res.redirect(authUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error", data: null });
  }
};

export const onedriveRedirect = async (req, res) => {
  try {
    const code = req.query.code;
    const state = req.query.state;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const redirectUri = process.env.AZURE_REDIRECT_URI;
    const tenantId = process.env.AZURE_TENANT_ID;

    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const body = new URLSearchParams({
      client_id: clientId,
      scope: "https://graph.microsoft.com/Files.ReadWrite https://graph.microsoft.com/User.Read offline_access",
      code: code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      client_secret: clientSecret,
    });

    // Fetch the access token from the OAuth token endpoint
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to fetch token: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();

    // Create a JWT token using the access and refresh tokens
    const jwtPayload = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      role: roles.STUDENT,
    };

    const jwtToken = jwt.sign(jwtPayload, "fdgt4t93xzc3252523");

    // Set the token in cookies
    res.cookie("jwt", jwtToken, {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    const userDataFromGraphApi = await getUserFromToken(tokenData.access_token);
    const findUser = await User.findOne({ email: userDataFromGraphApi.email });

    if (findUser) {
      const typeOfUser = findUser.typeOfUser;

      switch (typeOfUser) {
        case roles.STUDENT:
          res.redirect("http://localhost:3000/student/");
          return;
        case roles.RECRUITER:
          res.redirect("http://localhost:3000/recruiter/");
          return;
        case roles.ADMIN:
          res.redirect("http://localhost:3000/admin/");
          return;
      }
    }

    // If user is not found, create a new user based on the state
    switch (state) {
      case roles.STUDENT:
        await createUser({
          name: userDataFromGraphApi.name,
          email: userDataFromGraphApi.email,
          typeOfUser: roles.STUDENT,
        });
        res.redirect("http://localhost:3000/student/");
        break;

      case roles.RECRUITER:
        await createUser({
          name: userDataFromGraphApi.name,
          email: userDataFromGraphApi.email,
          typeOfUser: roles.RECRUITER,
        });
        res.redirect("http://localhost:3000/recruiter/");
        break;

      case roles.ADMIN:
        await createUser({
          name: userDataFromGraphApi.name,
          email: userDataFromGraphApi.email,
          typeOfUser: roles.ADMIN,
        });
        res.redirect("http://localhost:3000/admin/");
        break;

      default:
        res.status(500).json({ status: "error", message: "Internal Server Error", data: null });
        break;
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error", data: null });
  }
};

