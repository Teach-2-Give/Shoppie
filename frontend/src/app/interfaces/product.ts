<<<<<<< HEAD
export interface Product {
=======
import { Category } from '../../../../backend/src/interfaces/category.interface';
export interface Product {
    
>>>>>>> ededce58ea6eba6ed43bebbc68bc23a5590b3815
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
<<<<<<< HEAD
    stockQuantity: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;

    oldPrice?: number;
    discount?: number;
}
=======
    categoryId: number;
    // stockQuantity: number;
  }
>>>>>>> ededce58ea6eba6ed43bebbc68bc23a5590b3815
