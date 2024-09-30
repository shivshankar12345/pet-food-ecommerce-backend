import { Router } from "express";
import userRouter from "./users.route";
import productroutes from "./product.routes";
import jwtAuth from "../middleware/jwtAuth";
import adminRouter from "./admin/admin.route";
import validateAdmin from "./admin/admin.auth";

const mainRouter = Router();

mainRouter.use("/api/users", userRouter);

mainRouter.use("/products", productroutes);

mainRouter.use("/api/admin-panel", adminRouter);
export default mainRouter;
