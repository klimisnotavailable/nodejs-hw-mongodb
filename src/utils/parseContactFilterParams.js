import { contactFieldList } from "../constants/contactsFieldList.js";

const parseBoolean = value => {
    if(typeof value !== "string") return;

    if(!["true", "false"].includes(value)) return;

    return value === "true";
};

const parseContactFitlerParams = ({type, favorite})=> {
    const parsedType = contactFieldList.includes(type) ? type : null;
    const parsedFavorite = parseBoolean(favorite);
    return {
        type: parsedType,
        favorite: parsedFavorite,
    };
};

export default parseContactFitlerParams;
