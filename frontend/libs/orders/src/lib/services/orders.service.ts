import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../models/order';
import { environment } from '@env/environment';
import { IOrdersListResponse } from '../models/orders-list-response';
import { IOrderItemResponse } from '../models/order-item-response';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<IOrdersListResponse> {
    return this.http.get<IOrdersListResponse>(this.apiURLOrders);
  }

  getOrder(orderId: string): Observable<IOrderItemResponse> {
    return this.http.get<IOrderItemResponse>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(orderStatus: { status: string }, orderId: string | undefined): Observable<IOrderItemResponse> {
    return this.http.put<IOrderItemResponse>(`${this.apiURLOrders}/${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }
}
