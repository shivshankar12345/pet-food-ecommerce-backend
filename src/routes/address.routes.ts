import { Router } from "express";
import LocationController from "../controllers/address.controller";

const locationRouter = Router();
const locationController = new LocationController();

locationRouter.get("/getUserAddresses", locationController.getUserAddresses);
locationRouter.post("/createUserAddress", locationController.createUserAddress);
locationRouter.patch(
  "/updateUserAddress",
  locationController.updateUserAddress
);
locationRouter.delete(
  "/deleteUserAddress",
  locationController.deleteUserAddress
);
export default locationRouter;
