import { Order } from "../entity/order.entity";

export type discount = {
    id:string;
    code:string;
    description:string;
    discountAmount:number;
    discountType: 'Percentage' | 'Fixed';
    isActive: boolean; 
    startDate: string; 
    endDate: string; 
    usageLimit: number; 
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;  
}