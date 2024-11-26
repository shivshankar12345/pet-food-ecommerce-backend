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
import validateAdmin from "../middlewares/admin.auth";
import cartRouter from "./cart.routes";
import addressRouter from "./address.routes";

const mainRouter = Router();

mainRouter.use("/products", productroutes);

mainRouter.use("/users", userRouter);

mainRouter.use("/product-category", categoryRoutes);

mainRouter.use("/product-pet", petRoutes);

mainRouter.use("/seller", jwtAuth, sellerRouter);

mainRouter.use("/crousel", landingPageRouter);

mainRouter.use("/permission", jwtAuth, validateAdmin, permissionRouter);

mainRouter.use("/contact", contactRouter);

mainRouter.use("/role", jwtAuth, validateAdmin, roleRouter);

mainRouter.use("/cart", jwtAuth, cartRouter);

mainRouter.use("/address", jwtAuth, addressRouter);
export default mainRouter;
