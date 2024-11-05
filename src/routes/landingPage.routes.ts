import { Router } from "express";
import LandingPageController from "../controllers/landingPage.controller";
import { upload } from "../middlewares/upload.middleware";

const landingPageRouter = Router();
const landingPageController = new LandingPageController();

landingPageRouter.get("/crousel/getImages", landingPageController.getCrousel);
landingPageRouter.post(
  "/crousel/addImage",
  upload.single("imageUrl"),
  landingPageController.addCrousel
);
landingPageRouter.delete(
  "/crousel/deleteImage/:id",
  landingPageController.deleteCrousel
);

export default landingPageRouter;
