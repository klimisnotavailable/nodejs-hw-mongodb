import express from 'express';
import pino from "pino-http";
import cors from "cors";
import env from "./utils/env.js";
import cookieParser from 'cookie-parser';

const app = express();

const PORT = env("PORT");

import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';

export const setUpServer = () =>{
    app.use(
        pino({
          transport: {
            target: 'pino-pretty',
          },
        }),
    );

    app.use(cookieParser());
    app.use(cors());
    app.use(express.json());

    app.use("/contacts", contactsRouter);
    app.use("/auth", authRouter);


    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
