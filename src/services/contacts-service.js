import createHttpError from 'http-errors';
import Contact from '../db/Contact.js';

export const getContacts = () => Contact.find();

export const getContactById = id => Contact.findById(id);

export const postContact = data => Contact.create(data);

export const deleteContact = id => Contact.findByIdAndDelete(id);

export const upsetContact = async (filter,payload,options={}) => {
    const response = await Contact.findOneAndUpdate(filter,payload,{new:true,...options});

    if(!response) throw createHttpError(404,"contact not found");

    return response;
};

