import { Router } from "express";
import userRouter from "./users.route";
import productroutes from "./product.routes";

const mainRouter = Router();

mainRouter.use("/products", productroutes);
mainRouter.use("/user", userRouter);

export default mainRouter;
