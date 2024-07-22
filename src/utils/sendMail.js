import nodemailer from 'nodemailer';
import env from './env.js';

console.log(env("SMTP_HOST"),Number(env("SMTP_PORT")),env("SMTP_USER"),env("SMTP_PASSWORD"));
const transporter = nodemailer.createTransport({
    host:env("SMTP_HOST"),
    port:Number(env("SMTP_PORT")),
    auth:{
        user:env("SMTP_USER"),
        pass: env("SMTP_PASSWORD")
    }
});

export const sendMail = async (options)=> {
    return await transporter.sendMail(options);
};
