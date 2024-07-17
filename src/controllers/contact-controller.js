import { getAllContacts, getContact, postContact, deleteContact, upsetContact } from "../services/contacts-service.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { contactFieldList } from "../constants/contactsFieldList.js";
import parseContactFitlerParams from "../utils/parseContactFilterParams.js";


export const getContactsController = async (req,res) =>{
    const { _id: userId } = req.user;
    const {query} = req;
    const {page,perPage} = parsePaginationParams(req.query);
    const {sortBy,sortOrder} = parseSortParams(req.query,contactFieldList);
    const filter = {...parseContactFitlerParams(query),userId};

    const data = await getAllContacts(
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    );

    res.status(200).json({
        status:200,
        data,
    });
};

export const getContactsByIdController = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const { _id: userId } = req.user;

        const data = await getContact({id, userId});

        if(!data){
            throw createHttpError(404,`Contact with id=${id} not found`);
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
    req.body.userId = req.user._id;
    const data = await postContact(req.body);

    res.status(201).json({
        status:201,
        data,
        message:"Successfully created a contact!!",
    });
};

export const deleteContactController = async (req,res,next) => {
    const {id} = req.params;
    const { _id: userId } = req.user;
    const contact = await deleteContact({_id:id, userId});

    if(!contact){return next(createHttpError(404, 'Contact not found'));}

    res.status(204).json({
        status:204,
        message:"No content",
    });
};

export const upsetContactController = async (req, res, next) => {
    const {id} = req.params;
    const { _id: userId } = req.user;
    const body = req.body;
    const data = await upsetContact({_id:id,userId},body);

    if(!data){throw next(createHttpError(404,"Contact not found"));};

    res.status(200).json({
        status:200,
        data,
        message:"Sucsessfuly update a contact"
    });
};
