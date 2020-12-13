import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Jwt } from '../models/jwt';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    private sessionService: SessionService
  ) { }

  isAuthenticated(): boolean {
    const isTokenSet = !!this.sessionService.getToken();
    if (!isTokenSet) {
      return false;
    }

    const token: Jwt = jwtDecode(this.sessionService.getToken());
    const expireDate = new Date(token.exp * 1000);
    return expireDate > new Date();
  }

  isInRoles(roles: string[]): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    const token: Jwt = jwtDecode(this.sessionService.getToken());
    const roleName = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (typeof roleName === 'string') {
      return roles.indexOf(roleName as string) >= 0;
    } else {
      for (const role of roleName as string[]) {
        if (roles.includes(role)) {
          return true;
        }
      }

      return false;
    }
  }

  getUserRoles(): string[] | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    const token: Jwt = jwtDecode(this.sessionService.getToken());
    const roleName = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (typeof roleName === 'string') {
      return [ roleName ] as string[];
    }
    return roleName as string[];
  }

  getUserEmail(): string | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    const token: Jwt = jwtDecode(this.sessionService.getToken());
    return token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
  }
}
