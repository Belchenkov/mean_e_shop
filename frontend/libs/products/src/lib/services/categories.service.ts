import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CategoriesListResponse } from '../models/categories-list-response';
import { environment } from '../../../../../apps/admin/src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  api: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<CategoriesListResponse> {
    return this.http.get<CategoriesListResponse>(`${this.api}/categories`);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.api}/categories/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.api}/categories`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.api}/categories/${category.id}`, category);
  }

  deleteCategory(categoryId: string): Observable<Object> {
    return this.http.delete<Object>(`${this.api}/categories/${categoryId}`);
  }
}
