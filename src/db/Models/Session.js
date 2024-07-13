import { Schema, model } from "mongoose";

const Session = new Schema({
    userId:{type:String,required:true},
    accessId:{type:String,required:true},
    refreshToken:{type:String,required:true},
    accessTokenValidUntil:{type:Date,required:true},
    refreshTokenValidUntil:{type:Date,required:true},
});

export const sessionsCollection = model('sessions',Session);
