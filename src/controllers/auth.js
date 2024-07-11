import createHttpError from 'http-errors';
import {findUser, registerUser} from '../services/auth-service.js';

export const registerUserController = async (req, res) => {
  const {email} = req.body;
  const isExistingUser = await findUser({email});
  if(!isExistingUser){throw createHttpError(401,"Invalid email or password");}

  const user = await registerUser(req.body);

  res.json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
  };
