import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
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
