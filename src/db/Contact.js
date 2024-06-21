import { Schema, model } from "mongoose";

const contactSchema = new Schema({
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

},{
    timestamps:true,
    versionKey:false,
});

const Contact = model("contact",contactSchema);
export default Contact;
