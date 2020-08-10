import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { HttpResponse } from '@angular/common/http';
import { LoginRequest } from '../models/requests/login-request';
import { LoginResponse } from '../models/responses/login-response';
import { ForgotPasswordRequest } from '../models/requests/forgot-password-request';
import { ResetPasswordRequest } from '../models/requests/reset-password-request';
import { Jwt } from '../models/jwt';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: "root",
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
    return roles.indexOf(roleName) >= 0;
  }

  getUserRole(): string | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    const token: Jwt = jwtDecode(this.httpService.token);
    const roleName = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return roleName;
  }

  getUserEmail(): string | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    const token: Jwt = jwtDecode(this.httpService.token);
    return token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
  }

  async login(request: LoginRequest) : Promise<HttpResponse<LoginResponse>> {
    const response = await this.httpService.postAsJson<LoginResponse>('/api/auth/login', request, false);
    if (response.ok) {
      this.httpService.login(response.body.token);
    }

    return response;
  }

  logout(): void {
    this.httpService.logout();
  }

  async forgotPassword(request: ForgotPasswordRequest): Promise<HttpResponse<any>> {
    return await this.httpService.postAsJson('/api/auth/forgot-password', request, false);
  }

  async resetPassword(request: ResetPasswordRequest): Promise<HttpResponse<any>> {
    return await this.httpService.postAsJson('/api/auth/reset-password', request, false);
  }
}
