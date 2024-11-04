import { Router } from "express";
import userRouter from "./users.routes";
import productroutes from "./product.routes";
import jwtAuth from "../middlewares/jwtAuth";
import categoryRoutes from "./category.routes";
import petRoutes from "./pet.routes";
import landingPageRouter from "./landingPage.routes";
import contactRouter from "./contact.routes";
import permissionRouter from "./permission.routes";
import roleRouter from "./role.routes";
import sellerRouter from "./seller.routes";

const mainRouter = Router();

mainRouter.use("/api/products", productroutes);

mainRouter.use("/api/users", userRouter);

mainRouter.use("/api/product-category", categoryRoutes);

mainRouter.use("/api/product-pet", petRoutes);

mainRouter.use("/api/seller", sellerRouter);

mainRouter.use("/api/landing-page", landingPageRouter);

mainRouter.use("/api/permission", permissionRouter);

mainRouter.use("/api/contact", contactRouter);

mainRouter.use("/api/role", roleRouter);

export default mainRouter;
