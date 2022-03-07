import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { IUser } from '@frontend/users';
import { IAuthLoginResponse } from '../models/auth-login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string = `${environment.apiUrl}/users` ;

  constructor(
    private http: HttpClient,
  ) { }

  login(data: { email: string, password: string }): Observable<IAuthLoginResponse> {
    return this.http.post<IAuthLoginResponse>(`${this.api}/login`, { ...data });
  }
}
