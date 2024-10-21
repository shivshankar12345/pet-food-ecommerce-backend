import { Category } from "../entity/category.entity";
import { PetType } from "../utils/enum";


export interface Product {
  id?: string;
  name: string;
  category: Category;
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
