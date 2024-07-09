import express from "express";
import { getContactsController, getContactsByIdController, postContactController, deleteContactController, upsetContactController } from "../controllers/contact-controller.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import validateBody from "../utils/validateBody.js";
import { contactAddSchema, contactPatchSchema } from "../validation/contact-schemas.js";


const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get("/:id", isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post("/",validateBody(contactAddSchema), ctrlWrapper(postContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContactController));

contactsRouter.patch("/:id",validateBody(contactPatchSchema), isValidId, ctrlWrapper(upsetContactController));

export default contactsRouter;
