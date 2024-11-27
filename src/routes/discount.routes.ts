import {Router} from 'express';
import { createDiscountCoupon , getAllDiscountCoupons} from '../controllers/discount.controller';

const router = Router();

router.post("/createDiscountCoupon",createDiscountCoupon);
router.get("/getAllDiscountCoupons", getAllDiscountCoupons);

export default router;

