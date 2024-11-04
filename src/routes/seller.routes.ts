import { NextFunction, Request, Response, Router } from "express";
import SellerController from "../controllers/seller.controller";

const sellerRouter = Router();
const sellerController = new SellerController();

sellerRouter.get("/getVerifiedSeller", sellerController.getVerifiedSeller);

sellerRouter.get("/getPendingSeller", sellerController.getPendingSeller);

sellerRouter.patch(
  "/changeSellerStatus/approvedSeller",
  (req: Request, res: Response, next: NextFunction) => {
    req.body.is_verified = true;
    next();
  },
  sellerController.changeSellerStatus
);

sellerRouter.patch(
  "/changeSellerStatus/rejectSeller",
  (req: Request, res: Response, next: NextFunction) => {
    req.body.is_verified = false;
    next();
  },
  sellerController.changeSellerStatus
);

export default sellerRouter;
