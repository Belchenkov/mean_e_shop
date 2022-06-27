import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { ProductsListResponse } from '../models/products-list-response';
import { environment } from '@env/environment';
import { IProductItemResponse } from '../models/product-item-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api: string = `${environment.apiUrl}/products/` ;

  constructor(
    private http: HttpClient
  ) { }

  getProducts(categoriesFilter?: string[]): Observable<ProductsListResponse> {
    let params = new HttpParams();

    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }

    return this.http.get<ProductsListResponse>(`${this.api}`, { params });
  }

  getProduct(productId: string | undefined): Observable<IProductItemResponse> {
    return this.http.get<IProductItemResponse>(`${this.api}${productId}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.api}`, productData);
  }

  updateProduct(product: FormData, id: string): Observable<IProductItemResponse> {
    return this.http.put<IProductItemResponse>(`${this.api}${id}`, product);
  }

  deleteProduct(productId: string): Observable<IProductItemResponse> {
    return this.http.delete<IProductItemResponse>(`${this.api}${productId}`);
  }

  getFeaturedProducts(count: number): Observable<ProductsListResponse> {
    return this.http.get<ProductsListResponse>(`${this.api}/get/featured/${count}`);
  }
}
