import createHttpError from 'http-errors';
import {findUser, loginUser, registerUser,  logoutUser, refreshSession, requestResetToken} from '../services/auth-service.js';
import { setupSession } from '../utils/setUpSession.js';
import { ONE_DAY } from '../constants/index.js';
import jwt from "jsonwebtoken";
import { TEMPLATES_DIR } from '../constants/index.js';
import fs from "node:fs/promises";
import handlebars from 'handlebars';
import env from '../utils/env.js';

import { sendMail } from '../utils/sendMail.js';
const appDomain = env("APP_DOMAIN");
const JWT_SECRET = env("JWT_SECRET");


export const registerUserController = async (req, res) => {
  const {email} = req.body;
  const isExistingUser = await findUser({email});
  if(isExistingUser){throw createHttpError(401,"email already in use");}

  const user = await registerUser(req.body);

  const payload = {
    id:user.id,
    email
  };

  const token = jwt.sign(payload,JWT_SECRET);

  const emailTemplateSource = await fs.readFile(TEMPLATES_DIR, "utf-8");
  const emailTemplate = handlebars.compile(emailTemplateSource);
  const emailHTML = emailTemplate({
    project_name:'MY CONTACTS',
    appDomain:appDomain,
    token
  });

  const verifyEmail = {
    subject:"Verify email",
    to: email,
    html:emailHTML
  };

  await sendMail(verifyEmail);

  res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
};

export const loginUserController = async (req,res) =>{
  const user = await loginUser(req.body);

  res.cookie("refreshToken",user.refreshToken,{httpOnly:true,expires:new Date(Date.now()+ ONE_DAY)});
  res.cookie('sessionId', user._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(200).json({
    status:200,
    message:"user login success",
    accessToken:user.accessToken
  });

};

export const logoutUserController = async (req,res)=>{
 if(req.cookies.sessionId){
  await logoutUser(req.cookies.sessionId);
 }

 res.clearCookie('sessionId');
 res.clearCookie('refreshToken');

 res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const resetPasswordController = async (req,res) => {
  await requestResetToken(req.body.email);

  res.status(200).json({
    status:200,
    message:"Reset password email was successfully sent!",
  });
};
