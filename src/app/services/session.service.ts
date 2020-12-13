import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  onAuthenticateChange: Subject<boolean>;

  constructor() {
    this.onAuthenticateChange = new Subject();
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.onAuthenticateChange.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.onAuthenticateChange.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
