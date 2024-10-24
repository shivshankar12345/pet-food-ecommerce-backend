import { AppDataSource } from "../db/data-source";
import { Product } from "../entity/product.entity";
import { Product as ProductType } from "../types/product.types";
import ApplicationError from "../error/ApplicationError";
import { Like } from "typeorm";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);
async createProduct(productData: Partial<ProductType>): Promise<Product> {
  try {
    // Validate productData here if needed
    // For example: check if all required fields are present

    const product = this.productRepository.create(productData);
    
    const savedProduct = await this.productRepository.save(product);
    
    // You can also return a DTO instead of the raw entity if needed
    return savedProduct;
  } catch (error) {
    console.error("Error in createProduct service:", error); // Log error details
    throw new ApplicationError(500, "Error creating product");
  }
}

  async getAllProducts(
    page: number,
    limit: number,
    search: string = ""
  ): Promise<{ products: Product[]; total: number }> {
    const offset = (page - 1) * limit;

    try {
      // Query builder ka istemal karte hain
      const [products, total] = await this.productRepository.findAndCount({
        skip: offset,
        take: limit,
        where: {
          isDeleted: false,
          ...(search && {
            name: Like(`%${search}%`), // Case-insensitive search
          }),
        },
      });

      return { products, total };
    } catch (error) {
      throw new ApplicationError(500, "Error fetching products");
    }
  }

  async getProductById(id: string): Promise<Product> { // id is of type number
    try {
      const product = await this.productRepository.findOne({
        where: { id, isDeleted: false },
      });

      if (!product) {
        throw new ApplicationError(404, "Product not found");
      }
      return product;
    } catch (error) {
      throw new ApplicationError(500, "Error fetching product");
    }
  }

  async updateProduct(
    id:string, // id is of type number
    productData: Partial<Product>
  ): Promise<Product> {
    try {
      const existingProduct = await this.getProductById(id);
      const updatedProduct = {
        ...existingProduct,
        ...productData,
      };
      await this.productRepository.save(updatedProduct);
      return updatedProduct;
    } catch (error) {
      throw new ApplicationError(500, "Error updating product");
    }
  }

  async deleteProduct(id: string): Promise<void> { // id is of type number
    try {
      const existingProduct = await this.getProductById(id);

      existingProduct.isDeleted = true;
      await this.productRepository.save(existingProduct);
    } catch (error) {
      throw new ApplicationError(500, "Error deleting product");
    }
  }
}
