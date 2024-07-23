import Joi from "joi";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().allow("personal","work"),
    photo:Joi.string().min(10),
});

export const contactPatchSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().allow("personal","work"),
    photo:Joi.string().min(10),
});


