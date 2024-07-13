import createHttpError from 'http-errors';
import {findUser, loginUser, registerUser} from '../services/auth-service.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

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

};
