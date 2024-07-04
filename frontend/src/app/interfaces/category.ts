import { Product } from "../interfaces/product";

export interface Category {
  id: number;
  name: string;
  products?: Product[];
}