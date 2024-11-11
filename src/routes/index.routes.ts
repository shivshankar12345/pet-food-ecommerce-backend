import { Router } from "express";
import userRouter from "./users.routes";
import productroutes from "./product.routes";
import jwtAuth from "../middlewares/jwtAuth";
import categoryRoutes from "./category.routes";
import petRoutes from "./pet.routes";
import landingPageRouter from "./crousel.routes";
import contactRouter from "./contact.routes";
import permissionRouter from "./permission.routes";
import roleRouter from "./role.routes";
import sellerRouter from "./seller.routes";

const mainRouter = Router();

mainRouter.use("/products", productroutes);

mainRouter.use("/users", userRouter);

mainRouter.use("/product-category", categoryRoutes);

mainRouter.use("/product-pet", petRoutes);

mainRouter.use("/seller", sellerRouter);

mainRouter.use("/crousel", landingPageRouter);

mainRouter.use("/permission", permissionRouter);

mainRouter.use("/contact", contactRouter);

mainRouter.use("/role", roleRouter);

export default mainRouter;
