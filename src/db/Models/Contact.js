import { Schema, model } from "mongoose";
import { mongooseSaveError, setUpdateSettings } from "./hooks.js";

const contactSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    name: {
        type: String,
        requried:true
    },
    phoneNumber: {
        type: String,
        requried:true
    },
    email: {
        type:String,
        requried:false
    },
    isFavourite:{
        type:Boolean,
        default:"false"
    },
    contactType:{
        type:String,
        enum:["work", "home", "personal"],
        default:"personal",
        requried:true,
    },
    photo:{
        type:String,
        requried:false
    }
},{
    timestamps:true,
    versionKey:false,
});
contactSchema.post("save",mongooseSaveError);

contactSchema.pre("findOneAndUpdate",setUpdateSettings);

contactSchema.post("findOneAndUpdate",mongooseSaveError);

const Contact = model("contact",contactSchema);
export default Contact;
