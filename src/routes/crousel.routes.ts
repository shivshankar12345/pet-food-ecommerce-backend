import { Router } from "express";
import LandingPageController from "../controllers/crousel.controller";
import { upload } from "../middlewares/upload.middleware";

const landingPageRouter = Router();
const landingPageController = new LandingPageController();

landingPageRouter.get("/getImages", landingPageController.getCrousel);
landingPageRouter.post(
  "/addImage",
  upload.single("imageUrl"),
  landingPageController.addCrousel
);
landingPageRouter.delete(
  "/deleteImage/:id",
  landingPageController.deleteCrousel
);

export default landingPageRouter;
