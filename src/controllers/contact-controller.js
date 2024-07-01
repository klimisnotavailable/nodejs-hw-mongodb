import { getContacts, getContactById,postContact,deleteContact, upsetContact } from "../services/contacts-service.js";
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

export const postContactController = async (req,res) => {
    const data = await postContact(req.body);

    res.status(201).json({
        status:201,
        data,
        message:"Successfully created a contact!!",
    });
};

export const deleteContactController = async (req,res,next) => {
    const {id} = req.params;
    const contact = await deleteContact(id);

    if(!contact){return next(createHttpError(404, 'Contact not found'));}

    res.status(204).json({
        status:204,
        message:"No content",
    });
};

export const upsetContactController = async (req, res,next) => {
    const { id } = req.params;
    const data = await upsetContact({_id:id},req.body,{upsert:true});
    console.log(data);

    if(!data){return next(createHttpError(404, 'Contact not found'));}

    res.json({
        status:200,
        data,
        message:"Successfully patched a contact!"
    });
  };
