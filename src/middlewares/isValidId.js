import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (req,res,next) => {
    const isValid = isValidObjectId(req.params);
    if(!isValid)next(createHttpError(404,"Invalid ID"));

    next();
};
