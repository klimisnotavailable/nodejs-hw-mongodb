import createHttpError from 'http-errors';
import {findUser, loginUser, registerUser,  logoutUser, refreshSession, requestResetToken,resetPassword} from '../services/auth-service.js';
import { setupSession } from '../utils/setUpSession.js';
import { ONE_DAY } from '../constants/index.js';
import { generateAuthURL } from '../utils/googleOAuthClient2.js';


export const registerUserController = async (req, res) => {
  const {email} = req.body;
  const isExistingUser = await findUser({email});
  if(isExistingUser){throw createHttpError(401,"email already in use");}

  const user = await registerUser(req.body);

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

export const requestResetEmailController = async (req,res) => {
  const response = await requestResetToken(req.body.email);

  if(!response){return createHttpError(500,"Failed to send the email, please try again later.");}

  res.status(200).json({
    status: 200,
    message: "Reset password email has been successfully sent.",
    data: {}
  });
};

export const resetPasswordController = async (req,res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const googleOAuthController = async (req,res) => {
  const url = generateAuthURL();
  res.status(200).json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};
