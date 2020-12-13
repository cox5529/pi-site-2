import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  async postAsJson<T>(url: string, body: any, sendToken: boolean, port: string): Promise<HttpResponse<T>> {
    let headers = new HttpHeaders();
    if (sendToken) {
      headers = headers.set('Authorization', `Bearer ${this.sessionService.getToken()}`);
    }

    return await this.http.post<T>(`${this.baseUrl}:${port}${url}`, body, { headers, observe: 'response' })
      .toPromise()
      .catch((e: any) => {
        return e;
      });
  }

  async delete<T>(url: string, sendToken: boolean, port: string): Promise<HttpResponse<T>> {
    let headers = new HttpHeaders();
    if (sendToken) {
      headers = headers.set('Authorization', `Bearer ${this.sessionService.getToken()}`);
    }

    return await this.http.delete<T>(`${this.baseUrl}:${port}${url}`, { headers, observe: 'response' })
      .toPromise()
      .catch((e: any) => {
        return e;
      });
  }

  async putAsJson<T>(url: string, body: any, sendToken: boolean, port: string): Promise<HttpResponse<T>> {
    let headers = new HttpHeaders();
    if (sendToken) {
      headers = headers.set('Authorization', `Bearer ${this.sessionService.getToken()}`);
    }

    return await this.http.put<T>(`${this.baseUrl}:${port}${url}`, body, { headers, observe: 'response' })
      .toPromise()
      .catch((e: any) => {
        return e;
      });
  }

  async get<T>(url: string, sendToken: boolean, params: HttpParams, port: string): Promise<HttpResponse<T>> {
    let headers = new HttpHeaders();
    if (sendToken) {
      headers = headers.set('Authorization', `Bearer ${this.sessionService.getToken()}`);
    }

    if (!params) {
      params = new HttpParams();
    }


    return await this.http.get<T>(`${this.baseUrl}:${port}${url}`, { headers, observe: 'response', params })
      .toPromise()
      .catch((e: any) => {
        return e;
      });
  }
}
