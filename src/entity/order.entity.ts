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
import { Address } from "./address.entity";
@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.order, { eager: true })
  user: User;

  @ManyToOne(() => Cart, { eager: true })
  @JoinColumn({ name: "cart_id" })
  cart: Cart;

  // Placeholder for shippingAddress (stored as a string temporarily)
  @ManyToOne(()=>Address,(address)=>address.orders)
  Address: string; // This can be updated later to a proper relation

  @ManyToOne(() => DiscountCoupon, (coupon) => coupon.order, {
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
