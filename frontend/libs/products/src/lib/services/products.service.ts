import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { ProductsListResponse } from '../models/products-list-response';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api: string = `${environment.apiUrl}/products/` ;

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<ProductsListResponse> {
    return this.http.get<ProductsListResponse>(`${this.api}`);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.api}${productId}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.api}`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}${product.id}`, product);
  }

  deleteProduct(productId: string): Observable<Object> {
    return this.http.delete<Object>(`${this.api}${productId}`);
  }
}
