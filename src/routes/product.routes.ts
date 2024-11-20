import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  IsFeatured,
  getSellerListedProducts,
} from "../controllers/product.controller";
import { upload } from "../middlewares/upload.middleware";
import jwtAuth from "../middlewares/jwtAuth";
import validateSellerAccount from "../middlewares/seller.auth";

const router = express.Router();

router.post("/createproducts", upload.single("imageUrl"), createProduct);
router.get("/getAllproducts", getAllProducts);
router.get("/getProductById", getProductById);
router.put("/update", upload.single("imageUrl"), updateProduct);
router.delete("/delete", deleteProduct);
router.patch("/isfeatured", IsFeatured);
router.get(
  "/getSellerListedProducts",
  jwtAuth,
  validateSellerAccount,
  getSellerListedProducts
);
export default router;
