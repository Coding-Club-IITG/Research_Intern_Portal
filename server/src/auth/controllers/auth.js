import dotenv from "dotenv";
import querystring from "querystring";
import jwt from "jsonwebtoken";
import { roles } from "../../utils/roles.js";
import { createUser, getUserFromToken } from "../../users/controller.js";
import { User } from "../../users/model.js";
import logger from "../../utils/logger.js";
import { frontendUrl } from "../../../frontend-url.js";
import axios from "axios";
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
    const code = req.query.code;
    const state = req.query.state;

    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const redirectUri = process.env.AZURE_REDIRECT_URI;
    const tenantId = process.env.AZURE_TENANT_ID;

    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const body = new URLSearchParams({
      client_id: clientId,
      scope:
        "https://graph.microsoft.com/Files.ReadWrite https://graph.microsoft.com/User.Read offline_access",
      code: code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      client_secret: clientSecret,
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!tokenResponse.ok) {
      const errorResponse = await tokenResponse.json();
      throw new Error(
        `Failed to fetch token: ${JSON.stringify(errorResponse)}`
      );
    }

    const tokenData = await tokenResponse.json();

    const jwtPayload = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      role: roles.STUDENT,
    };

    const jwtToken = jwt.sign(jwtPayload, "fdgt4t93xzc3252523");

    res.cookie("jwt", jwtPayload, {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

    const userDataFromGraphApi = await getUserFromToken(tokenData.access_token);

    const findUser = await User.findOne({ email: userDataFromGraphApi.email });
    if (findUser) {
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

    const createdUser = await createUser({
      name: userDataFromGraphApi.name,
      email: userDataFromGraphApi.email,
      typeOfUser: state,
    });

    const newUserCookie = {
      name: createdUser.name,
      user_id: createdUser._id,
      connection_id: createdUser.connection_id,
      typeOfUser: createdUser.typeOfUser,
    };

    if (newUserCookie) {
      try {
        const notificationResponse = await axios.post(
          `${process.env.NOTIFICATION_URL}/createOne`,
          {
            title: "Welcome to Research Intern Portal, IIT Guwahati",
            message:
              "We are glad to have you on board! Feel free to explore the platform and reach out to us in case of any queries. We recommend you to complete your profile to get the best experience.",
            link: `/profile/overview`,
            userIds: [createdUser.connection_id],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        logger.info(
          "Notification sent successfully:",
          notificationResponse.data
        );

        // await axios.post(`${process.env.EMAIL_URL}/send-email`, {
        //   emails: [createdUser.email],
        //   subject: "Welcome to Research Intern Portal, IIT Guwahati",
        //   message: `We are glad to have you on board! Feel free to explore the platform and reach out to us in case of any queries. We recommend you to complete your profile to get the best experience.`,
        // });
      } catch (err) {
        console.log(err);
        logger.error(err);
      }
    }

    const stringify = JSON.stringify(newUserCookie);

    res.cookie("user", stringify, {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

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
    return res
      .status(500)
      .json({ status: "error", message: err.message, data: null });
  }
};

export const logout = async (req, res) => {
  try {
    // Retrieve configuration from environment variables
    const clientId = process.env.AZURE_CLIENT_ID;
    const tenantId = process.env.AZURE_TENANT_ID;
    const redirectUri = frontendUrl;

    const logoutUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?client_id=${clientId}&post_logout_redirect_uri=${redirectUri}`;

    res.clearCookie("jwt");
    res.clearCookie("user");
    res.redirect(logoutUrl);
  } catch (err) {
    console.log(err);
    logger.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
  }
};
