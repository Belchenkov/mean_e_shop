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

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.api}/categories`, category);
  }
}
