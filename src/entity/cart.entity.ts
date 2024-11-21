import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity("Cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user_id: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @Column()
  qty: number;
}
