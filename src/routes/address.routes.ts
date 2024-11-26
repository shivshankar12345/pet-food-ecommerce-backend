import { Router } from "express";
import LocationController from "../controllers/address.controller";

const locationRouter = Router();
const locationController = new LocationController();

locationRouter.get("/getUserAddresses", locationController.createUserAddress);
locationRouter.post("/createUserAddress", locationController.getUserAddresses);
locationRouter.patch(
  "/updateUserAddress",
  locationController.updateUserAddress
);
locationRouter.delete(
  "/deleteUserAddress",
  locationController.deleteUserAddress
);
export default locationRouter;
