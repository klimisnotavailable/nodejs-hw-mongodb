import express from "express";

import { getContactsController,getContactsByIdController } from "../controllers/contact-controller.js";

const contactsRouter = express.Router();

contactsRouter.get("/contacts", getContactsController);

contactsRouter.get("/contacts/:id", getContactsByIdController);

export default contactsRouter;
