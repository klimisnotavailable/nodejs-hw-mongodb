import { usersCollection } from "../db/Models/User.js";
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from "http-errors";
import { sessionsCollection } from "../db/Models/Session.js";
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const findUser = filter => usersCollection.findOne(filter);

export const registerUser = async (data) => {
  const encryptedPassword = await bcrypt.hash(data.password,10);

  return await usersCollection.create({
    ...data,
    password:encryptedPassword
  });
};

export const loginUser = async (data) => {
  console.log(data);

  const user = await usersCollection.findOne({ email: data.email });
  console.log(user);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(data.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Invalid password');
  }

  await sessionsCollection.deleteOne({id:user._id});

  const accsessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");

  return await sessionsCollection.create({
    userId: user._id,
    accsessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY)
  });
};

export const logoutUser = async (sessionId) => {
  await sessionsCollection.deleteOne({ _id: sessionId });
};

export const refreshUser = async () => {};
