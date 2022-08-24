import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

import { environment } from '@env/environment';
import { IUsersListResponse } from '../models/users-list-response';
import { IUsersItemResponse } from '../models/users-item-response';
import { IUser } from '../models/user';
declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api: string = `${environment.apiUrl}/users/` ;

  constructor(
    private http: HttpClient
  ) {
    // ts-ignore
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsers(): Observable<IUsersListResponse> {
    return this.http.get<IUsersListResponse>(`${this.api}`);
  }

  getUser(userId: string): Observable<IUsersItemResponse> {
    return this.http.get<IUsersItemResponse>(`${this.api}${userId}`);
  }

  createUser(userData: IUser): Observable<IUsersItemResponse> {
    return this.http.post<IUsersItemResponse>(`${this.api}/register`, userData);
  }

  updateUser(user: IUser): Observable<IUsersItemResponse> {
    return this.http.put<IUsersItemResponse>(`${this.api}${user.id}`, user);
  }

  deleteUser(userId: string): Observable<IUsersItemResponse> {
    return this.http.delete<IUsersItemResponse>(`${this.api}${userId}`);
  }

  getCountries() {
    return Object.entries(countriesLib.getNames('en',{
      select: 'official'
    })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      }
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }
}
