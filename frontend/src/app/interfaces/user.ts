import { Order } from "./Order";


export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;  
    createdAt: Date;
    updatedAt: Date;
    cart?: any;  
    orders?: Order[];
    reviews?: any[];  
  }