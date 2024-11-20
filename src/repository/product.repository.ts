import { AppDataSource } from "../db/data-source";
import { Product } from "../entity/product.entity";

export const productRepository = AppDataSource.getRepository(Product);
