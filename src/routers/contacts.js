import express from "express";
import { getContactsController, getContactsByIdController, postContactController, deleteContactController, upsetContactController } from "../controllers/contact-controller.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getContactsController);

contactsRouter.get("/:id", getContactsByIdController);

contactsRouter.post("/", postContactController);

contactsRouter.delete("/:id",deleteContactController);

contactsRouter.put("/:id",upsetContactController);

export default contactsRouter;
