import { NextFunction, Request, Response } from "express";
import { discountRepositry } from "../repository/discount.repository"; 
import ApplicationError from "../error/ApplicationError"; 
import { checkRequiredValidation } from "../modules/validation";
import { DiscountCoupon } from "../entity/discount.entity";

export const createDiscountCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      code,
      description,
      discountAmount,
      discountType,
      isActive,
      startDate,
      endDate,
      usageLimit,vgb
    } = req.body;

    const validationData: any = await checkRequiredValidation([
      { field: "code", value: code, type: "Empty" },
      { field: "description", value: description, type: "Empty" },
      { field: "discountAmount", value: discountAmount, type: "Numeric" },
      { field: "discountType", value: discountType, type: "Empty" },
      { field: "isActive", value: isActive, type: "Boolean" },
      { field: "startDate", value: startDate, type: "Date" },
      { field: "endDate", value: endDate, type: "Date" },
      { field: "usageLimit", value: usageLimit, type: "Numeric" },
    ]);
     if(!validationData.status){
       throw new ApplicationError(400,"All fields required");
     }

    const existingCoupon = await discountRepositry.findOne({ where: { code } });
    if (existingCoupon) {
      throw new ApplicationError(
        400,
        "Discount coupon with this code already exists"
      );
    }

    const discountCoupon = new DiscountCoupon();
    discountCoupon.code = code;
    discountCoupon.description = description;
    discountCoupon.discountAmount = discountAmount;
    discountCoupon.discountType = discountType;
    discountCoupon.isActive = isActive;
    discountCoupon.startDate = startDate;
    discountCoupon.endDate = endDate;
    discountCoupon.usageLimit = usageLimit;

    const savedCoupon = await discountRepositry.save(discountCoupon);

    return res.status(201).json({
      message: "Discount coupon created successfully",
      data: savedCoupon,
    });
  } catch (error) {
    return next(error); 
  }
};
