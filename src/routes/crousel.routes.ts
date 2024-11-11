import { Router } from "express";
import CrouselController from "../controllers/crousel.controller";
import { upload } from "../middlewares/upload.middleware";
import jwtAuth from "../middlewares/jwtAuth";
import validateAdmin from "../middlewares/admin.auth";

const crouselRouter = Router();
const crouselController = new CrouselController();

crouselRouter.get("/getImages", crouselController.getCrousel);

crouselRouter.post(
  "/addImage",
  jwtAuth,
  validateAdmin,
  upload.single("imageUrl"),
  crouselController.addCrousel
);
crouselRouter.patch(
  "/updateImage/:id",
  jwtAuth,
  validateAdmin,
  upload.single("imageUrl"),
  crouselController.updateCrousel
);
crouselRouter.delete(
  "/deleteImage/:id",
  jwtAuth,
  validateAdmin,
  crouselController.deleteCrousel
);

export default crouselRouter;
