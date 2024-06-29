import express from "express";
import { getContactsController, getContactsByIdController, postContactController, deleteContactController, upsetContactController } from "../controllers/contact-controller.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get("/:id", ctrlWrapper(getContactsByIdController));

contactsRouter.post("/", ctrlWrapper(postContactController));

contactsRouter.delete("/:id",ctrlWrapper(deleteContactController));

contactsRouter.put("/:id",ctrlWrapper(upsetContactController));

export default contactsRouter;
