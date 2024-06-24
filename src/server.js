import express from 'express';
import pino from "pino-http";
import cors from "cors";

const app = express();

const PORT = 3000;

import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import { getPostContactController } from './controllers/contact-controller.js';

export const setUpServer = () =>{
    app.use(
        pino({
          transport: {
            target: 'pino-pretty',
          },
        }),
    );

    app.use(cors());

    app.use("/contacts", contactsRouter);

    // app.post("/contacts", getPostContactController);

    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
