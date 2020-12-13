import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpResponse } from '@angular/common/http';
import { LoginRequest } from '../models/requests/login-request';
import { LoginResponse } from '../models/responses/login-response';
import { ForgotPasswordRequest } from '../models/requests/forgot-password-request';
import { ResetPasswordRequest } from '../models/requests/reset-password-request';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpService: HttpService,
    private sessionService: SessionService
  ) {}

  async login(request: LoginRequest): Promise<HttpResponse<LoginResponse>> {
    const response = await this.httpService.postAsJson<LoginResponse>('/api/auth/login', request, false, environment.authServicePort);
    if (response.ok) {
      this.sessionService.login(response.body.token);
    }

    return response;
  }

  logout(): void {
    this.sessionService.logout();
  }

  async forgotPassword(request: ForgotPasswordRequest): Promise<HttpResponse<any>> {
    return await this.httpService.postAsJson('/api/auth/forgot-password', request, false, environment.authServicePort);
  }

  async resetPassword(request: ResetPasswordRequest): Promise<HttpResponse<any>> {
    return await this.httpService.postAsJson('/api/auth/reset-password', request, false, environment.authServicePort);
  }
}
