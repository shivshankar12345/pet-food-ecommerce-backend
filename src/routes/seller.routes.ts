import { NextFunction, Request, Response, Router } from "express";
import SellerController from "../controllers/seller.controller";
import { approveSeller, rejectSeller } from "../middlewares/sellerRequest";

const sellerRouter = Router();
const sellerController = new SellerController();

sellerRouter.get("/getVerifiedSeller", sellerController.getVerifiedSeller);

sellerRouter.get("/getPendingSeller", sellerController.getPendingSeller);

sellerRouter.patch(
  "/changeSellerStatus/approvedSeller",
  approveSeller,
  sellerController.changeSellerStatus
);

sellerRouter.patch(
  "/changeSellerStatus/rejectSeller",
  rejectSeller,
  sellerController.changeSellerStatus
);

export default sellerRouter;
