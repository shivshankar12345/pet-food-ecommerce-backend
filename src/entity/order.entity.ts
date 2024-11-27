import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity"; // User entity
import { DiscountCoupon } from "./discount.entity"; // DiscountCoupon entity
import { Cart } from "./cart.entity"; // Cart entity

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @ManyToOne(() => Cart, { eager: true })
  @JoinColumn({ name: "cart_id" })
  cart: Cart;

  // Placeholder for shippingAddress (stored as a string temporarily)
  @Column({ type: "varchar", nullable: true })
  shippingAddress: string; // This can be updated later to a proper relation

  @ManyToOne(() => DiscountCoupon, (coupon) => coupon.orders, {
    nullable: true,
    eager: true,
  })
  discountCoupon: DiscountCoupon;

  @Column("decimal")
  totalAmount: number;

  @Column({ type: "varchar", default: "pending" })
  status: string; // order confirm , shipped, out for delivery, delivered

  @Column({ type: "datetime" })
  orderDate: Date;

  @Column({ type: "datetime", nullable: true })
  shippedDate: Date;

  @Column({ type: "datetime", nullable: true })
  deliveredDate: Date;

  @Column({ type: "boolean", default: false })
  isPaid: boolean;

  @Column({ type: "boolean", default: false })
  isCancelled: boolean;
}
