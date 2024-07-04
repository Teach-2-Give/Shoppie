// <<<<<<< HEAD
import { Cart } from "../../../../backend/src/interfaces/cart.interface";
import { Order } from "../../../../backend/src/interfaces/order.interface";
import { Review } from "../../../../backend/src/interfaces/review.interface";
import { Role } from "../../../../backend/src/interfaces/role.enum";

export interface User {

  email: string;
  password: string;
  name: string;
 
}

export interface LoginResponse {
  token: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface RequestPasswordResetResponse {
  message: string;
}
// =======
// import { Order } from "./Order";


export interface User {
    // id: number;
    email: string;
    password: string;
    name: string;
    // role: string;  
    // createdAt: Date;
    // updatedAt: Date;
    // cart?: any;  
    // orders?: Order[];
    // reviews?: any[];  
  }
// >>>>>>> 872c82fa963e2a6616503cd39997b32d0836c56c
