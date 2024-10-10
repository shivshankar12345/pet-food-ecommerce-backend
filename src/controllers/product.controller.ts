import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { Product as ProductType } from "../types/product.types";
import ApplicationError from "../error/ApplicationError";
import { checkRequiredValidation } from "../modules/validation";
import { uploadToCloudinary } from "../utils/cloudinary"; // Using Cloudinary here
import { Category, PetType } from "../utils/enum";
import Responses from "../modules/responses";

const productService = new ProductService();

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      categoryId,
      price,
      description,
      stock,
      brandId,
      sellerId,
      petType,
    } = req.body;

    const validationData: any = await checkRequiredValidation([
      { field: "Name", value: name, type: "Empty" },
      { field: "Category ID", value: categoryId, type: "Empty" },
      { field: "Price", value: price, type: "Empty" },
      { field: "Description", value: description, type: "Empty" },
      { field: "Stock", value: stock, type: "Empty" },
      { field: "Brand ID", value: brandId, type: "Empty" },
      { field: "Seller ID", value: sellerId, type: "Empty" },
      { field: "Pet Type", value: petType, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, "Validation is required");
    }

    if (!Object.values(Category).includes(categoryId)) {
      throw new ApplicationError(400, "Invalid category");
    }
    if (!Object.values(PetType).includes(petType)) {
      throw new ApplicationError(400, "Invalid petType");
    }

    const imageFile = req.file; // This is the uploaded file
    console.log("Uploaded file:", imageFile);
    if (!imageFile) {
      throw new ApplicationError(400, "Image file is required");
    }

    const CloudinaryResponse = await uploadToCloudinary(
      imageFile,
      "products"
    );
    const imageUrl = CloudinaryResponse.secure_url;
    const productData: ProductType = {
      name,
      categoryId,
      price: parseFloat(price),
      description,
      stock: parseInt(stock, 10),
      imageUrl, // Use the URL obtained from Cloudinary
      brandId: parseInt(brandId, 10),
      sellerId: parseInt(sellerId, 10),
      petType,
    };

    const newProduct = await productService.createProduct(productData);
    return Responses.generateSuccessResponse(res, 201, { data: newProduct });
  } catch (error: any) {
    console.error("Error in createProduct:", error); // Log the error
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const search = (req.query.search as string)?.trim() || "";

  try {
    const { products, total } = await productService.getAllProducts(
      page,
      limit,
      search
    );

    if (!products.length) {
      return Responses.generateSuccessResponse(res, 200, {
        data: [],
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: total,
          totalPages: 0,
        },
      });
    }

    return Responses.generateSuccessResponse(res, 200, {
      data: products,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id as string | null;
    if (!id) {
      throw new ApplicationError(400, "Product ID is required");
    }

    const validationData = await checkRequiredValidation([
      { field: "Product ID", value: id, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, validationData.message);
    }

    const product = await productService.getProductById(parseInt(id, 10));

    if (!product) {
      return Responses.generateErrorResponse(res, 404, {
        message: "Product not found",
      });
    }

    return Responses.generateSuccessResponse(res, 200, { data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id as string | null;

    // Validate Product ID
    if (!id) {
      throw new ApplicationError(400, "Product ID is required");
    }

    const validationData = await checkRequiredValidation([
      { field: "Product ID", value: id, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, validationData.message);
    }

    // Get existing product
    const existingProduct = await productService.getProductById(
      parseInt(id, 10)
    );
    if (!existingProduct) {
      throw new ApplicationError(404, "Product not found");
    }

    // Validate petType and categoryId
    const { petType, categoryId } = req.body;

    if (petType && !Object.values(PetType).includes(petType)) {
      throw new ApplicationError(400, "Invalid petType");
    }

    if (categoryId && !Object.values(Category).includes(categoryId)) {
      throw new ApplicationError(400, "Invalid category");
    }

    // Handle image upload if provided
    let imageUrl;
    if (req.file) {
      const CloudinaryResponse = await uploadToCloudinary(
        req.file,
        "products"
      );
      imageUrl = CloudinaryResponse.secure_url;
    } else {
      imageUrl = existingProduct.imageUrl;
    }

    // Prepare product data for update
    const productData: Partial<ProductType> = {
      ...req.body,
      imageUrl,
      id: existingProduct.id,
      createdAt: existingProduct.createdAt,
      updatedAt: new Date(),
    };

    // Update product in the database
    const updatedProduct = await productService.updateProduct(
      existingProduct.id,
      productData
    );

    // Send success response
    return Responses.generateSuccessResponse(res, 200, {
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id as string | null;

    if (!id) {
      throw new ApplicationError(400, "Product ID is required.");
    }

    const validationData = await checkRequiredValidation([
      { field: "Product ID", value: id, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, validationData.message);
    }

    const productId = parseInt(id, 10);
    const existingProduct = await productService.getProductById(productId);

    if (!existingProduct) {
      throw new ApplicationError(404, "Product not found");
    }

    await productService.deleteProduct(productId);

    return Responses.generateSuccessResponse(res, 200, {
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};