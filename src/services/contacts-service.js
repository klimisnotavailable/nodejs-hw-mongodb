import Contact from '../db/Contact.js';

export const getContacts = () => Contact.find();

export const getContactById = id => Contact.findById(id);

export const postContact = data => Contact.create(data);

export const deleteContact = id => Contact.findOneAndDelete(id);

export const upsetContact = (filter,payload,options={}) => Contact.findOneAndUpdate(filter,payload,{
    new:true,
    ...options
});
