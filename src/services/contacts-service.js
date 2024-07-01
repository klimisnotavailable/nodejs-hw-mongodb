import Contact from '../db/Contact.js';

export const getContacts = () => Contact.find();

export const getContactById = id => Contact.findById(id);

export const postContact = data => Contact.create(data);

export const deleteContact = id => Contact.findByIdAndDelete(id);

export const upsetContact = (filter,payload,options={}) => Contact.findByIdAndUpdate(filter,payload,{
    new:true,
    ...options
});
