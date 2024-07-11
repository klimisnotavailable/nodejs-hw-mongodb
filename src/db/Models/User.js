import { Schema, model } from "mongoose";

const User = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const usersCollection = model("users",User);

const Session = new Schema({
  userId:{type:String,required:true},
  accessId:{type:String,required:true},
  refreshToken:{type:String,required:true},
  accessTokenValidUntil:{type:Date,required:true},
  refreshTokenValidUntil:{type:Date,required:true},
});

export const sessionsCollection = model('sessions',Session);
