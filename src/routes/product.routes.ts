import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controller";
import { upload } from "../middleware/upload.middleware";

const router = express.Router();

router.post("/createproducts", upload.single("imageUrl"), createProduct);
router.get("/getAllproducts", getAllProducts);

export default router;
