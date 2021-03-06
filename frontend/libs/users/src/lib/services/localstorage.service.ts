import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private TOKEN = 'jwtToken';

  constructor() { }

  getToken(): string {
    return <string>localStorage.getItem(this.TOKEN);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN);
  }
}
