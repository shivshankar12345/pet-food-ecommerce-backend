import { Router } from "express";
import ContactController from "../controllers/contact.controller";
import jwtAuth from "../middlewares/jwtAuth";
import validateAdmin from "../middlewares/admin.auth";

const contactRouter = Router();
const contactController = new ContactController();

contactRouter.get("/getAllContact", contactController.getAll);
contactRouter.post(
  "/addContact",
  jwtAuth,
  validateAdmin,
  contactController.addContact
);
contactRouter.patch(
  "/updateContact",
  jwtAuth,
  validateAdmin,
  contactController.updateContact
);
contactRouter.post("/connectWithUs", contactController.connectWithUs);
contactRouter.get("/getSpecificContact", contactController.getContact);
contactRouter.delete(
  "/deleteContact",
  jwtAuth,
  validateAdmin,
  contactController.deleteContact
);

export default contactRouter;
