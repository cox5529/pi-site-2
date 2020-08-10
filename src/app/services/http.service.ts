import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token: string;
  baseUrl: string = environment.apiUrl;

  onAuthenticateChange: Subject<boolean>;

  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.onAuthenticateChange = new Subject();
  }

  login(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    this.onAuthenticateChange.next(true);
  }

  logout(): void {
    this.token = undefined;
    localStorage.removeItem('token');
    this.onAuthenticateChange.next(false);
  }

  async postAsJson<T>(url: string, body: any, sendToken: boolean): Promise<HttpResponse<T>> {
    let headers = new HttpHeaders();
    if (sendToken) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    return await this.http.post<T>(`${this.baseUrl}${url}`, body, { headers, observe: 'response' })
      .toPromise()
      .catch((e: any) => {
        return e;
      });
  }

  async delete<T>(url: string, sendToken: boolean): Promise<HttpResponse<T>> {
    let headers = new HttpHeaders();
    if (sendToken) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    return await this.http.delete<T>(`${this.baseUrl}${url}`, { headers, observe: 'response' })
      .toPromise()
      .catch((e: any) => {
        return e;
      });
  }

  async putAsJson<T>(url: string, body: any, sendToken: boolean): Promise<HttpResponse<T>> {
    let headers = new HttpHeaders();
    if (sendToken) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    return await this.http.put<T>(`${this.baseUrl}${url}`, body, { headers, observe: 'response' })
      .toPromise()
      .catch((e: any) => {
        return e;
      });
  }

  async get<T>(url: string, sendToken: boolean, params: HttpParams): Promise<HttpResponse<T>> {
    let headers = new HttpHeaders();
    if (sendToken) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    if (!params) {
      params = new HttpParams();
    }


    return await this.http.get<T>(`${this.baseUrl}${url}`, { headers, observe: 'response', params })
      .toPromise()
      .catch((e: any) => {
        return e;
      });
  }
}