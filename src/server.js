import express from 'express';
import pino from "pino-http";
import cors from "cors";

const app = express();

const PORT = 3000;

import { getContacts,getContactById } from './services/contacts-service.js';

export const setUpServer = () =>{
    app.use(
        pino({
          transport: {
            target: 'pino-pretty',
          },
        }),
    );

    app.use(cors());

    app.get("/contacts", async (req,res)=>{
        try {
            const data = await getContacts();
            res.json({
                status:200,
                message: "Successfully found contacts!",
                data,
            });
        } catch (error) {
            throw new Error(error.message);
        }
    });

    app.get("/contacts/:id", async (req,res)=>{
        try {
            const {id} = req.params;

            const data = await getContactById(id);

            if(!data){
               return res.status(404).json({
                    message:`Movie with id=${id} not found`
                });
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
            const {status = 500} = error;
            res.status(status).json({
                message:"Something went wrong"
            });
        }
    });

    app.get("*",(req,res)=>{
        res.status(404).send({
            message:"Not found",
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
