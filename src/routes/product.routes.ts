import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller";
import { upload } from "../middlewares/upload.middleware";

const router = express.Router();

router.post("/createproducts", upload.single("imageUrl"), createProduct);
router.get("/getAllproducts", getAllProducts);
router.get("/getProductById", getProductById);
router.put("/update", upload.single("imageUrl"), updateProduct);
router.delete("/delete", deleteProduct)
export default router;