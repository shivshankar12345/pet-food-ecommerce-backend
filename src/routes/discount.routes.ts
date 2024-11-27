import {Router} from 'express';
import { createDiscountCoupon } from '../controllers/discount.controller';

const router = Router();

router.post("/createDiscountCoupon",createDiscountCoupon);

export default router;

