import { Router } from "express";
import productroutes from "./product.routes";

const mainRouter = Router();

mainRouter.use("/products", productroutes);
export default mainRouter;
