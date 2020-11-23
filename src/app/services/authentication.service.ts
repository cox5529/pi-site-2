import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpResponse } from '@angular/common/http';
import { LoginRequest } from '../models/requests/login-request';
import { LoginResponse } from '../models/responses/login-response';
import { ForgotPasswordRequest } from '../models/requests/forgot-password-request';
import { ResetPasswordRequest } from '../models/requests/reset-password-request';
import { Jwt } from '../models/jwt';
import * as jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpService: HttpService) {}

  isAuthenticated(): boolean {
    const isTokenSet = !!this.httpService.token;
    if (!isTokenSet) {
      return false;
    }

    const token: Jwt = jwtDecode(this.httpService.token);
    const expireDate = new Date(token.exp * 1000);
    return expireDate > new Date();
  }

  isInRoles(roles: string[]): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    const token: Jwt = jwtDecode(this.httpService.token);
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

    const token: Jwt = jwtDecode(this.httpService.token);
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

    const token: Jwt = jwtDecode(this.httpService.token);
    return token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
  }

  async login(request: LoginRequest): Promise<HttpResponse<LoginResponse>> {
    const response = await this.httpService.postAsJson<LoginResponse>('/api/auth/login', request, false, environment.authServicePort);
    if (response.ok) {
      this.httpService.login(response.body.token);
    }

    return response;
  }

  logout(): void {
    this.httpService.logout();
  }

  async forgotPassword(request: ForgotPasswordRequest): Promise<HttpResponse<any>> {
    return await this.httpService.postAsJson('/api/auth/forgot-password', request, false, environment.authServicePort);
  }

  async resetPassword(request: ResetPasswordRequest): Promise<HttpResponse<any>> {
    return await this.httpService.postAsJson('/api/auth/reset-password', request, false, environment.authServicePort);
  }
}
