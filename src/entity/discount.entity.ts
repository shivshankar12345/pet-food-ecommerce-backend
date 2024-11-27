import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './order.entity';  // Reference to Order entity

@Entity('discount_coupons')
export class DiscountCoupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, unique: true })
  code: string; 

  @Column('varchar', { length: 255 })
  description: string; 

  @Column('decimal', { precision: 10, scale: 2 })
  discountAmount: number; 

  @Column('enum', { enum: ['Percentage', 'Fixed'], default: 'Fixed' })
  discountType: 'Percentage' | 'Fixed';  

  @Column('boolean', { default: true })
  isActive: boolean; 

  @Column('date', { nullable: true })
  startDate: string; 

  @Column('date', { nullable: true })
  endDate: string; 

  @Column('integer', { default: 1 })
  usageLimit: number; 

  @OneToMany(() => Order, order => order.discountCoupon)
  order: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
