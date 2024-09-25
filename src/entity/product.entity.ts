import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: "category_id" })
  categoryId: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  stock: number;

  @Column({ name: "image_url", nullable: true })
  imageUrl: string;

  @Column({ name: "brand_id", nullable: true })
  brandId: number;

  @Column({ name: "seller_id" })
  sellerId: number;

  @Column({ name: "pet_type", nullable: true })
  petType: string;
}
