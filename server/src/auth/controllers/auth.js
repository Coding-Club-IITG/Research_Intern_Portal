import dotenv from 'dotenv';
import querystring from 'querystring';
import jwt from 'jsonwebtoken';
import { roles } from '../../utils/roles.js';
import { createUser } from '../../users/controller.js';
import { User } from '../../users/model.js';
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
        state: req.body.role // we have to change this 
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
    const state = req.query.state;
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

    const jwtPayload = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      role: roles.STUDENT,
    };

    const jwtToken = jwt.sign(jwtPayload, 'fdgt4t93xzc3252523');

    // setting the token in cookies
    res.cookie('jwt',jwtToken,{
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 1 // 1 hour
      }
    )

    const findUser = await User.findOne({email: 'email'});

    if(findUser){
      const typeOfUser = findUser.typeOfUser;

      switch(typeOfUser){
        case roles.STUDENT:
          res.redirect('http://localhost:3000/student/');
          return;
        case roles.RECRUITER:
          res.redirect('http://localhost:3000/recruiter/');
          return;
        case roles.ADMIN:
          res.redirect('http://localhost:3000/admin/');
          return;
      }
    }
    

    switch (state) {
      case roles.STUDENT:
        try {
          const user = await createUser({
            name: 'name',
            email: 'email',
            typeOfUser: roles.STUDENT
          })
          console.log(user);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
        res.redirect('http://localhost:3000/student/');
        break;

      case roles.RECRUITER:
        try {
          const user = await createUser({
            name: 'name',
            email: 'email',
            typeOfUser: roles.RECRUITER
          })
          console.log(user);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
        res.redirect('http://localhost:3000/recruiter/');
        break;

      case roles.ADMIN:
        try {
          const user = await createUser({
            name: 'name',
            email: 'email',
            typeOfUser: roles.ADMIN
          })
          console.log(user);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
        res.redirect('http://localhost:3000/admin/');
        break;

      default:
        res.status(500).json({ message: 'Internal Server Error' });
        break;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


