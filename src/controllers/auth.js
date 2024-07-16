import createHttpError from 'http-errors';
import {findUser, loginUser, registerUser,logoutUser,refreshSession} from '../services/auth-service.js';
import { setupSession } from '../utils/setUpSession.js';
import { ONE_DAY } from '../constants/index.js';

export const registerUserController = async (req, res) => {
  const {email} = req.body;
  const isExistingUser = await findUser({email});
  console.log(isExistingUser);
  if(isExistingUser){throw createHttpError(401,"Invalid email or password");}

  const user = await registerUser(req.body);

  res.json({
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
