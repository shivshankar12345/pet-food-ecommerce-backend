import { AppDataSource } from "../db/data-source";
import { Product } from "../entity/product.entity";
import { Product as ProductType } from "../types/product.types";
import ApplicationError from "../error/ApplicationError";
import { Like } from "typeorm";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);
  async createProduct(productData: Partial<ProductType>): Promise<Product> {
    try {
      const product = this.productRepository.create(productData);

      const savedProduct = await this.productRepository.save(product);

      return savedProduct;
    } catch (error) {
      console.error("Error in createProduct service:", error);
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
      const [products, total] = await this.productRepository.findAndCount({
        skip: offset,
        take: limit,
        where: {
          isDeleted: false,
          ...(search && {
            name: Like(`%${search}%`),
          }),
        },
        relations: ["category", "petType"],
      });

      return { products, total };
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product> {
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
    id: string,
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

  async deleteProduct(id: string): Promise<void> {
    try {
      const existingProduct = await this.getProductById(id);

      existingProduct.isDeleted = true;
      await this.productRepository.save(existingProduct);
    } catch (error) {
      throw new ApplicationError(500, "Error deleting product");
    }
  }

  async IsFeatured(id: string): Promise<Product | null> {
    try {
      const existingProduct = await this.getProductById(id);

      if (!existingProduct) {
        throw new ApplicationError(404, "Product not found");
      }
      existingProduct.IsFeatured = !existingProduct.IsFeatured;
      await this.productRepository.save(existingProduct);
      return existingProduct;
    } catch (error) {
      throw new ApplicationError(500, "Error in featuring product");
    }
  }

  async getListedProducts(
    user: string,
    skip: number,
    take: number,
    search: string
  ) {
    try {
      const products = await this.productRepository.find({
        take,
        skip,
        where: [
          {
            sellerId: user,
            name: Like(`%${search}%`),
          },
          {
            sellerId: user,
            description: Like(`%${search}%`),
          },
        ],
        select: ["id", "name", "description", "stock", "imageUrl", "price"],
      });
      const total_products = await this.productRepository.count({
        where: [
          {
            sellerId: user,
            name: Like(`%${search}%`),
          },
          {
            sellerId: user,
            description: Like(`%${search}%`),
          },
        ],
      });
      return { products, total_products };
    } catch (error) {
      throw error;
    }
  }
}
