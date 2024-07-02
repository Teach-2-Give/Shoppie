import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = 'your-auth-token-here'; // Replace with dynamic token retrieval if necessary
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }

  addProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  editProduct(product: Product): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.apiUrl}/${product.id}`, product, { headers });
  }

  deleteProduct(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
