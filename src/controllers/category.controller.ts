import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import ApplicationError from "../error/ApplicationError";

const categoryService = new CategoryService();

export class CategoryController {
    async createCategory(req: Request, res: Response) {
        try {
            const categoryData = req.body;
            const category = await categoryService.createCategory(categoryData);
            return res.status(201).json(category);
        } catch (error) {
            if (error instanceof ApplicationError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllCategories(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || "";

            const { categories, total } = await categoryService.getAllCategories(page, limit, search);
            return res.status(200).json({ total, categories });
        } catch (error) {
            if (error instanceof ApplicationError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryById(id);
            return res.status(200).json(category);
        } catch (error) {
            if (error instanceof ApplicationError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const categoryData = req.body;
            const updatedCategory = await categoryService.updateCategory(id, categoryData);
            return res.status(200).json(updatedCategory);
        } catch (error) {
            if (error instanceof ApplicationError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await categoryService.deleteCategory(id);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof ApplicationError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
