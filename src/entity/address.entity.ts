import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

enum AddressType {
  HOME = "home",
  WORK = "work",
}

@Entity("Address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user_id: User;

  @Column({ default: 0 })
  house_num: string;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  area: string;

  @Column({ nullable: false })
  pin_code: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({
    enumName: "address_type",
    enum: AddressType,
    default: AddressType.HOME,
  })
  address_type: AddressType;
}
