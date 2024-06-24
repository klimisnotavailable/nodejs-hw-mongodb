import Contact from '../db/Contact.js';

export const getContacts = () => Contact.find();

export const getContactById = id => Contact.findById(id);

export const postContact = async (payload) => {
    const contact = await Contact.create(payload);
    return contact;
} ;
