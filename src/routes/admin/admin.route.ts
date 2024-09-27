import { NextFunction, Request, Response, Router } from "express";

const adminRouter = Router();

adminRouter.get(
  "/getUserDetails",
  (req: Request, res: Response, next: NextFunction) => {}
);

adminRouter.get(
  "/getSellerDetails",
  (req: Request, res: Response, next: NextFunction) => {}
);

adminRouter.get(
  "/getPendingSeller",
  (req: Request, res: Response, next: NextFunction) => {}
);

adminRouter.patch(
  "/changeSellerStatus",
  (req: Request, res: Response, next: NextFunction) => {}
);
export default adminRouter;
