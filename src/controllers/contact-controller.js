import { getContacts, getContactById,postContact } from "../services/contacts-service.js";
import createHttpError from "http-errors";

export const getContactsController = async (req,res) =>{
    const data = await getContacts();

    res.status(200).json({
        status:200,
        data,
    });
};

export const getContactsByIdController = async (req,res,next)=>{
    try {
        const {id} = req.params;

        const data = await getContactById(id);

        if(!data){
            throw createHttpError(404,`Movie with id=${id} not found`);
        }

        res.json({
            status:200,
            message: `Successfully found contact with id ${id}!`,
            data,
        });

    }
    catch (error) {
        if(error.message.includes("Cast to ObjectId failed")){
            error.status = 404;
            res.status(404).json({
                message:"Wrong id"
            });
        }
        next(error);
    }};


export const getPostContactController = async (req,res) => {
    const contact = await postContact(req.body);

    res.status(201).json({
        data:contact,
        message:"created!",
    });

};
