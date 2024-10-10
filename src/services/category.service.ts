import { AppDataSource } from "../db/data-source";
import { Category } from "../entity/category.entity";
import ApplicationError from "../error/ApplicationError";
import { Like } from "typeorm";

export class CategoryService {
    private categoryRepository = AppDataSource.getRepository(Category);

    async createCategory(categoryData: Partial<Category>): Promise<Category> {
        try {
            const category = this.categoryRepository.create(categoryData);
            return await this.categoryRepository.save(category);
        } catch (error) {
            throw new ApplicationError(500, "Error creating category");
        }
    }

    async getAllCategories(
        page: number,
        limit: number,
        search: string = ""
    ): Promise<{ categories: Category[]; total: number }> {
        const offset = (page - 1) * limit;
        try {
            const [categories, total] = await this.categoryRepository.findAndCount({
                skip: offset,
                take: limit,
                where: {
                    ...(search && { name: Like(`%${search}%`) }),
                },
            });

            return { categories, total };
        } catch (error) {
            throw new ApplicationError(500, "Error fetching categories");
        }
    }

    async getCategoryById(id: string): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id },
            });

            if (!category) {
                throw new ApplicationError(404, "Category not found");
            }
            return category;
        } catch (error) {
            throw new ApplicationError(500, "Error fetching category");
        }
    }

    async updateCategory(
        id: string,
        categoryData: Partial<Category>
    ): Promise<Category> {
        try {
            const existingCategory = await this.getCategoryById(id);
            const updatedCategory = {
                ...existingCategory,
                ...categoryData,
            };
            await this.categoryRepository.save(updatedCategory);
            return updatedCategory;
        } catch (error) {
            throw new ApplicationError(500, "Error updating category");
        }
    }

    async deleteCategory(id: string): Promise<void> {
        try {
            const existingCategory = await this.getCategoryById(id);
            await this.categoryRepository.remove(existingCategory);
        } catch (error) {
            throw new ApplicationError(500, "Error deleting category");
        }
    }
}
