import { Router } from "express";
import CartController from "../controllers/cart.controller";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.post("/addCartItem", cartController.addToCart);
cartRouter.get("/getCartItems", cartController.getCartItems);
cartRouter.patch("/updateCartItem", cartController.updateCartQuantity);
cartRouter.delete("/deleteCartItem", cartController.deletCartItem);
cartRouter.get("/getOneCartItem", cartController.getOneCartItem);
export default cartRouter;
