import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
<<<<<<< HEAD

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // Update with your actual API URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
=======
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
>>>>>>> ededce58ea6eba6ed43bebbc68bc23a5590b3815
      'Authorization': `Bearer ${token}`
    });
  }

<<<<<<< HEAD
  createOrder(): Observable<any> {
    return this.http.post<any>(this.apiUrl, {}, { headers: this.getAuthHeaders() });
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl, { headers: this.getAuthHeaders(), body: { orderId } });
  }
}
=======
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
>>>>>>> ededce58ea6eba6ed43bebbc68bc23a5590b3815
