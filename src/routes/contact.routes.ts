import { Router } from "express";
import ContactController from "../controllers/contact.controller";

const contactRouter = Router();
const contactController = new ContactController();

contactRouter.get("/getAllContact", contactController.getAll);
contactRouter.post("/addContact", contactController.addContact);
contactRouter.patch("/updateContact", contactController.updateContact);
contactRouter.post("/connectWithUs", contactController.connectWithUs);
contactRouter.get("/getSpecificContact", contactController.getContact);
contactRouter.delete("/deleteContact", contactController.deleteContact);

export default contactRouter;
