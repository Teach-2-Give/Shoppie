import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = 'your-auth-token-here'; // Replace with dynamic token retrieval if necessary
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getOrders(): Observable<Order[]> {
    const headers = this.getHeaders();
    return this.http.get<Order[]>(this.apiUrl, { headers });
  }

  addOrder(order: Order): Observable<Order> {
    const headers = this.getHeaders();
    return this.http.post<Order>(this.apiUrl, order, { headers });
  }

  editOrder(order: Order): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.apiUrl}/${order.id}`, order, { headers });
  }

  deleteOrder(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
