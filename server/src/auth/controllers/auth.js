import dotenv from "dotenv";
import querystring from "querystring";
import jwt from "jsonwebtoken";
import { roles } from "../../utils/roles.js";
import { createUser, getUserFromToken } from "../../users/controller.js";
import { User } from "../../users/model.js";
import logger from "../../utils/logger.js";
import { frontendUrl } from "../../../frontend-url.js";
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
        scope:
          "https://graph.microsoft.com/Files.ReadWrite https://graph.microsoft.com/User.Read offline_access",
        state: "recruiter", // we have to change this
      });
    // console.log(authUrl)
    logger.info(`${authUrl}`);
    res.redirect(authUrl);
  } catch (err) {
    logger.err(err);
    res
      .status(500)
      .json({ status: "error", message: "Internal Server Error", data: null });
  }
};

export const onedriveRedirect = async (req, res) => {
  try {
    console.log("🔹 Received OAuth Redirect Request");
    
    const code = req.query.code;
    const state = req.query.state;
    console.log("🔹 Authorization Code:", code);
    console.log("🔹 State:", state);

    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const redirectUri = process.env.AZURE_REDIRECT_URI;
    const tenantId = process.env.AZURE_TENANT_ID;
    
    console.log("🔹 Client ID:", clientId);
    console.log("🔹 Redirect URI:", redirectUri);
    console.log("🔹 Tenant ID:", tenantId);

    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    
    const body = new URLSearchParams({
      client_id: clientId,
      scope: "https://graph.microsoft.com/Files.ReadWrite https://graph.microsoft.com/User.Read offline_access",
      code: code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      client_secret: clientSecret,
    });

    console.log("🔹 Sending token request to:", tokenUrl);
    console.log("🔹 Token Request Body:", body.toString());

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    console.log("🔹 Token Response Status:", tokenResponse.status);

    if (!tokenResponse.ok) {
      const errorResponse = await tokenResponse.json();
      console.error("❌ Failed to fetch token:", errorResponse);
      throw new Error(`Failed to fetch token: ${JSON.stringify(errorResponse)}`);
    }

    const tokenData = await tokenResponse.json();
    console.log("🔹 Token Data:", tokenData);

    const jwtPayload = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      role: roles.STUDENT,
    };

    const jwtToken = jwt.sign(jwtPayload, "fdgt4t93xzc3252523");
    console.log("🔹 JWT Token Generated");

    res.cookie("jwt", jwtPayload, {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

    const userDataFromGraphApi = await getUserFromToken(tokenData.access_token);
    console.log("🔹 User Data from Graph API:", userDataFromGraphApi);

    const findUser = await User.findOne({ email: userDataFromGraphApi.email });
    if (findUser) {
      console.log("🔹 Existing User Found:", findUser.email);

      const userCookie = {
        name: findUser.name,
        user_id: findUser._id,
        connection_id: findUser.connection_id,
        typeOfUser: findUser.typeOfUser,
      };

      const stringify = JSON.stringify(userCookie);

      res.cookie("user", stringify, {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      });

      console.log("🔹 Redirecting Existing User to:", findUser.typeOfUser);

      switch (findUser.typeOfUser) {
        case roles.STUDENT:
          return res.redirect(`${frontendUrl}/student/`);
        case roles.RECRUITER:
          return res.redirect(`${frontendUrl}/recruiter/`);
        case roles.ADMIN:
          return res.redirect(`${frontendUrl}/admin/`);
        default:
          throw new Error("User type not recognized");
      }
    }

    console.log("🔹 Creating New User");

    const createdUser = await createUser({
      name: userDataFromGraphApi.name,
      email: userDataFromGraphApi.email,
      typeOfUser: state,
    });

    console.log("🔹 New User Created:", createdUser.email);

    const newUserCookie = {
      name: createdUser.name,
      user_id: createdUser._id,
      connection_id: createdUser.connection_id,
      typeOfUser: createdUser.typeOfUser,
    };

    const stringify = JSON.stringify(newUserCookie);

    res.cookie("user", stringify, {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

    console.log("🔹 Redirecting New User to:", state);

    switch (state) {
      case roles.STUDENT:
        return res.redirect(`${frontendUrl}/student/`);
      case roles.RECRUITER:
        return res.redirect(`${frontendUrl}/recruiter/`);
      case roles.ADMIN:
        return res.redirect(`${frontendUrl}/admin/`);
      default:
        return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
          data: null,
        });
    }
  } catch (err) {
    console.error("❌ Error in onedriveRedirect:", err);
    return res.status(500).json({ status: "error", message: err.message, data: null });
  }
};

