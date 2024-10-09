import { Router } from "express";
import userRouter from "./users.route";
import productroutes from "./product.routes";
import adminRouter from "./admin/admin.route";
import validateAdmin from "./admin/admin.auth";
import jwtAuth from "../middlewares/jwtAuth";

const mainRouter = Router();

mainRouter.use("/products", productroutes);

mainRouter.use("/api/users", userRouter);

mainRouter.use("/api/admin-panel", jwtAuth, validateAdmin, adminRouter);

export default mainRouter;
