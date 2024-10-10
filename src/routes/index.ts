import { Router } from "express";
import userRouter from "./users.route";
import productroutes from "./product.routes";
import adminRouter from "./admin/admin.route";
import validateAdmin from "./admin/admin.auth";
import sellerRouter from "./seller/seller.route";
import jwtAuth from "../middlewares/jwtAuth";
import validateSeller from "./seller/seller.auth";

const mainRouter = Router();

mainRouter.use("/products", productroutes);

mainRouter.use("/api/users", userRouter);

mainRouter.use("/api/admin-panel", validateAdmin, adminRouter);

mainRouter.use("/api/seller-section", jwtAuth, validateSeller, sellerRouter);

export default mainRouter;
