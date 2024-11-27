import { AppDataSource } from "../db/data-source";
import { DiscountCoupon } from "../entity/discount.entity";

export const discountRepositry = AppDataSource.getRepository(DiscountCoupon)

