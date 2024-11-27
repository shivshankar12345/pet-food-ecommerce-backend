import { AppDataSource } from "../db/data-source";
import { DiscountCoupon } from "../entity/discount.entity";

export const discountRepository = AppDataSource.getRepository(DiscountCoupon)

