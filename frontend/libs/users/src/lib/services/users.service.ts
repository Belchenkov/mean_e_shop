import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { IUsersListResponse } from '../models/users-list-response';
import { IUsersItemResponse } from '../models/users-item-response';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api: string = `${environment.apiUrl}/users/` ;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<IUsersListResponse> {
    return this.http.get<IUsersListResponse>(`${this.api}`);
  }

  getUser(userId: string): Observable<IUsersItemResponse> {
    return this.http.get<IUsersItemResponse>(`${this.api}${userId}`);
  }

  createUser(userData: IUser): Observable<IUsersItemResponse> {
    console.log(userData);
    return this.http.post<IUsersItemResponse>(`${this.api}/register`, userData);
  }

  updateUser(user: IUser): Observable<IUsersItemResponse> {
    return this.http.put<IUsersItemResponse>(`${this.api}${user.id}`, user);
  }

  deleteUser(userId: string): Observable<IUsersItemResponse> {
    return this.http.delete<IUsersItemResponse>(`${this.api}${userId}`);
  }
}
