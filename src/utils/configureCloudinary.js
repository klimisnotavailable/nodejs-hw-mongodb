import {v2 as cloudinary} from "cloudinary";
import createHttpError from "http-errors";
import env from "../utils/env.js";

const api_key = env("CLOUDINARY_API_KEY");
const api_secret = env("CLOUDINARY_API_SECRET");
const cloud_name = env("CLOUDINARY_CLOUD_NAME");

cloudinary.config({
    secure:true,
    api_key,
    api_secret,
    cloud_name
});

const uploadImage = async (imagePath)=>{
    const options = {
        use_filename: true,
    };
    try {
        const result = await cloudinary.uploader.upload(imagePath,options);
        console.log(result);
        return (await result).secure_url;
    } catch (error) {
        return createHttpError(error.status || 500, error.message);
    }
};

export default uploadImage;
