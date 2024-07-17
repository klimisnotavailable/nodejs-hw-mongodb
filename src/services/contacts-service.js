import createHttpError from 'http-errors';
import Contact from '../db/Models/Contact.js';

export const getAllContacts = async (page,perPage,sortBy = "_id",sortOrder="asc",filter) => {
    const skip = (page - 1) * perPage;

    const dataBaseQuery = Contact.find();


    if(filter.userId){
        dataBaseQuery.where("userId").equals(filter.userId);
    };

    const totalItems = await Contact.countDocuments();
    const totalPages = Math.ceil(totalItems/perPage);
    const items = await dataBaseQuery.skip(skip).limit(perPage).sort({[sortBy]:sortOrder});

    const hasNextPage = page!==totalPages;
    const hasPrevPage = page !== 1;

    return {
        page,
        perPage,
        totalItems,
        totalPages,
        data:items,
        hasNextPage,
        hasPrevPage
    };
};

export const getContact = filter => Contact.findOne(filter);

export const postContact = data => Contact.create(data);

export const deleteContact = filter => {
    return Contact.findByIdAndDelete(filter);
};

export const upsetContact = async (filter,payload,options={}) => {
    const response = await Contact.findOneAndUpdate(filter,payload,{new:true,runValidators:true, ...options});

    if(!response) throw createHttpError(404,"contact not found");

    return response;
};

