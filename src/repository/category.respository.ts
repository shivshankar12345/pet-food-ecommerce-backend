import { AppDataSource } from "../db/data-source";
import { Category } from "../entity/category.entity";

export const categoryRepository = AppDataSource.getRepository(Category);