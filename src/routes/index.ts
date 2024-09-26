import { Router } from "express";
import userRouter from "./users.route";
import productroutes from "./product.routes";

const mainRouter = Router();

mainRouter.use("/api/users", userRouter);

mainRouter.use("/products", productroutes);
export default mainRouter;
