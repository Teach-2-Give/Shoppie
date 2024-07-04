<<<<<<< HEAD
=======
import { Order } from "./Order";


>>>>>>> ededce58ea6eba6ed43bebbc68bc23a5590b3815
export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
<<<<<<< HEAD
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
  
=======
    role: string;  
    createdAt: Date;
    updatedAt: Date;
    cart?: any;  
    orders?: Order[];
    reviews?: any[];  
  }
>>>>>>> ededce58ea6eba6ed43bebbc68bc23a5590b3815
