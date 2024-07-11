import { usersCollection } from "../db/Models/User.js";
import bcrypt from 'bcrypt';
import createHttpError from "http-errors";

export const findUser = filter => usersCollection.find(filter);

export const registerUser = async (data) => {
  const encryptedPassword = await bcrypt.hash(data.password,10);

  return await usersCollection.create({
    ...data,
    password:encryptedPassword
  });
};
