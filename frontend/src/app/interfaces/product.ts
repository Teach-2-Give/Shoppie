import { Category } from '../../../../backend/src/interfaces/category.interface';
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
  }