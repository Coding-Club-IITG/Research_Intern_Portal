import dotenv from 'dotenv';
import querystring from 'querystring';
import jwt from 'jsonwebtoken';
dotenv.config();

export const onedriveLogin = async (req, res) => {
  try {
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const redirectUri = process.env.AZURE_REDIRECT_URI;
    const tenantId = process.env.AZURE_TENANT_ID;

    const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?` +
      querystring.stringify({
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        response_mode: "query",
        scope: "https://graph.microsoft.com/Files.ReadWrite offline_access",
        state: "12345" // we have to change this 
      });
    res.redirect(authUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const onedriveRedirect = async (req, res) => {
  try {
    const code = req.query.code;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const redirectUri = process.env.AZURE_REDIRECT_URI;
    const tenantId = process.env.AZURE_TENANT_ID;

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
  //  console.log(tokenData);

    const jwtPayload = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
    };

    const jwtToken = jwt.sign(jwtPayload, 'fdgt4t93xzc3252523');

    // setting the token in cookies
    res.cookie('jwt',jwtToken,{
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 1 // 1 hour
      }
    )
    res.send(jwtToken);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


