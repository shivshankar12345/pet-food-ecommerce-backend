import express from "express";
import {
    createCategory, 
    getAllCategories,
    getCategoryById, 
    softDeleteCategory,

} from "../controllers/category.controller";

const router = express.Router();

router.post ("/createCategory",createCategory);
router.get  ("/getAllCategories",getAllCategories);
router.get ("/getCategoryById",getCategoryById);
router.delete("/delete",softDeleteCategory);

export default router;