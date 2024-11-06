import { Router } from "express";
import CrouselController from "../controllers/crousel.controller";
import { upload } from "../middlewares/upload.middleware";

const crouselRouter = Router();
const crouselController = new CrouselController();

crouselRouter.get("/getImages", crouselController.getCrousel);
crouselRouter.post(
  "/addImage",
  upload.single("imageUrl"),
  crouselController.addCrousel
);
crouselRouter.patch(
  "/updateImage/:id",
  upload.single("imageUrl"),
  crouselController.updateCrousel
);
crouselRouter.delete("/deleteImage/:id", crouselController.deleteCrousel);

export default crouselRouter;
