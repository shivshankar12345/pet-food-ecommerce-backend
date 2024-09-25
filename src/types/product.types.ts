export interface Product {
  id?: number;
  name: string;
  categoryId: number;
  price: number;
  description?: string;
  stock: number;
  imageUrl: string;
  brandId?: number;
  sellerId: number;
  petType?: string;
  createdAt?: Date; 
  updatedAt?: Date; 
}
