import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ResponseHttpDefaultLogin } from 'src/app/models/response-http-default-login';
import { ResponseHttpLogin } from 'src/app/models/response-http-login';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  checkUser(): boolean {
    if (
      sessionStorage.getItem('userToken') &&
      sessionStorage.getItem('currentUser')
    ) {
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('refreshToken');
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<ResponseHttpLogin>(environment.apiUrl + 'pub/auths/login', {
        email,
        password,
      })
      .pipe(
        map((data) => {
          if (data.data.user && data.data.api_token) {
            this.setUser(JSON.stringify(data.data.user));
            this.setToken(data.data.api_token);
            return data.data.user;
          }
          return null;
        }),
        catchError((error: any) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  loginDefault(email: string, password: string) {
    return this.httpClient
      .post<ResponseHttpDefaultLogin>(environment.apiUrl + 'oauth/token', {
        username: email,
        password,
        client_id: environment.auth.clientId,
        client_secret: environment.auth.clientSecret,
        grant_type: 'password',
        scope: '',
      })
      .pipe(
        map((data) => {
          if (data.access_token) {
            this.setUser('');
            this.setToken(data.access_token);
            this.setRefreshToken(data.refresh_token);
            return true;
          }
          return null;
        }),
        catchError((error: any) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  setRefreshToken(refreshToken: string) {
    sessionStorage.setItem('refreshToken', refreshToken);
  }

  setToken(token: string) {
    sessionStorage.setItem('userToken', token);
  }

  setUser(userString: string) {
    sessionStorage.setItem('currentUser', userString);
  }

  getToken(): string {
    if (this.checkUser()) {
      return sessionStorage.getItem('userToken');
    }
    return '';
  }
}
