import express from "express";
import { getContactsController, getContactsByIdController, postContactController, deleteContactController, upsetContactController } from "../controllers/contact-controller.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import validateBody from "../utils/validateBody.js";
import { contactAddSchema, contactPatchSchema } from "../validation/contact-schemas.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";


const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get("/:id", isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post("/",upload.single("photo"),validateBody(contactAddSchema), ctrlWrapper(postContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContactController));

contactsRouter.patch("/:id",upload.single("photo"),validateBody(contactPatchSchema), isValidId, ctrlWrapper(upsetContactController));

export default contactsRouter;

