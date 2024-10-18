import { Category, PetType } from "../utils/enum";

export interface Product {
  id?: string;
  name: string;
  categoryId: Category;
  price: number;
  description?: string;
  stock: number;
  imageUrl: string;
  brandId?: string;
  sellerId: string;
  petType?: PetType;
  createdAt?: Date; 
  updatedAt?: Date; 
}
