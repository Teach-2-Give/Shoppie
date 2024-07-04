import { Category } from '../../../../backend/src/interfaces/category.interface';
export interface Product {
    category: string;
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: number;
    stock: number;
  }