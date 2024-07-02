import Contact from '../db/Contact.js';

export const getContacts = () => Contact.find();

export const getContactById = id => Contact.findById(id);

export const postContact = data => Contact.create(data);

export const deleteContact = id => Contact.findByIdAndDelete(id);

export const upsetContact = async (filter,payload,options={}) => {
    const result = await Contact.findOneAndUpdate(filter,payload,{
    new:true,
    ...options});

if (!result || !result.value) return null;

// const isNew = data && data.lastErrorObject && data.lastErrorObject.upserted;
const isNew = Boolean(result?.lastErrorObject?.upserted);

return {
    data: result.value,
    isNew,
};

};
