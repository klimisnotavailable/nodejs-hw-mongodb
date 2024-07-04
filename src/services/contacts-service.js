import Contact from '../db/Contact.js';

export const getContacts = () => Contact.find();

export const getContactById = id => Contact.findById(id);

export const postContact = data => Contact.create(data);

export const deleteContact = id => Contact.findByIdAndDelete(id);

export const upsetContact =  (filter,payload,options={}) => {

    const result = Contact.findOneAndUpdate(filter,payload,{
    new:true,
    ...options});
    console.log("before operation");


    if (!result) return null;

// const isNew = data && data.lastErrorObject && data.lastErrorObject.upserted;

    return {
        data: result,
    };
};

// export const upsetContact = async (filter,payload,options={}) => Contact.findOneAndUpdate(filter,payload,{new:true,...options});
