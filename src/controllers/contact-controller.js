import { Router } from "express";
import { getContacts, getContactById } from "../services/contacts-service";

export const getContactsController = async (req,res) =>{
    const data = await getContacts();

    res.status(200).json({
        status:200,
        data,
    });
};

// export const getContactsByIdController = async (req,res) =>{

//     const data = await getContactById(id)
// }
