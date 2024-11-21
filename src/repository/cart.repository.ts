import { AppDataSource } from "../db/data-source";
import { Cart } from "../entity/cart.entity";

export const cartRepository = AppDataSource.getRepository(Cart);
