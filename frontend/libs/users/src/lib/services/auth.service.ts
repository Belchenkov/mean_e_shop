import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
import { IAuthLoginResponse } from '../models/auth-login-response';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string = `${environment.apiUrl}/users` ;

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router,
  ) { }

  login(data: { email: string, password: string }): Observable<IAuthLoginResponse> {
    return this.http.post<IAuthLoginResponse>(`${this.api}/login`, { ...data });
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
