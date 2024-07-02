import { OrderItem } from "./OrderItem";

export interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    total: number;
    createdAt: Date;
  }