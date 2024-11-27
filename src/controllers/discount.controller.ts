import { NextFunction, Request, Response } from "express";
import { discountRepository } from "../repository/discount.repository"; 
import ApplicationError from "../error/ApplicationError"; 
import { checkRequiredValidation } from "../modules/validation";
import { Like } from "typeorm";


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
      usageLimit
    } = req.body;

    // Validate required fields
    const validationData = await checkRequiredValidation([
      { field: "code", value: code, type: "Empty" },
      { field: "description", value: description, type: "Empty" },
      { field: "discountAmount", value: discountAmount, type: "Numeric" },
      { field: "discountType", value: discountType, type: "Empty" },
      { field: "isActive", value: isActive, type: "Boolean" },
      { field: "startDate", value: startDate, type: "Date" },
      { field: "endDate", value: endDate, type: "Date" },
      { field: "usageLimit", value: usageLimit, type: "Numeric" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, "All fields required");
    }

    // Validate discount type
    if (!['PERCENTAGE', 'FIXED'].includes(discountType)) {
      throw new ApplicationError(400, "Invalid discount type. Must be either PERCENTAGE or FIXED");
    }

    // Validate dates
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    if (endDateTime <= startDateTime) {
      throw new ApplicationError(400, "End date must be after start date");
    }

    // Validate discount amount
    if (discountType === 'PERCENTAGE' && (discountAmount <= 0 || discountAmount > 100)) {
      throw new ApplicationError(400, "Percentage discount must be between 0 and 100");
    }

    // Check for existing coupon
    const existingCoupon = await discountRepository.findOne({ where: { code } });
    if (existingCoupon) {
      throw new ApplicationError(400, "Discount coupon with this code already exists");
    }
    
    const newDiscountCoupon = discountRepository.create(req.body);
    const savedCoupon = await discountRepository.save(newDiscountCoupon);

    return res.status(201).json({
      success: true,
      message: "Discount coupon created successfully",
      data: savedCoupon,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllDiscountCoupons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const search = (req.query.search as string)?.trim() || "";
    
    // Add validation for pagination parameters
    if (limit < 1 || page < 1) {
      throw new ApplicationError(400, "Invalid pagination parameters");
    }

    const [discount_coupons, total] = await discountRepository.findAndCount({
      where: { ...(search && { code: Like(`%${search}%`) }) },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' } // Assuming you have a createdAt field
    });

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    const paginationData = {
      total,
      totalPages,
      currentPage: page,
      nextPage,
      previousPage,
      limit
    };

    return res.status(200).json({
      success: true,
      message: "Discount coupons fetched successfully",
      data: discount_coupons,
      pagination: paginationData
    });
  } catch (error) {
    return next(error);
  }
};