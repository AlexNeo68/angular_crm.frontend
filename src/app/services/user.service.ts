import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<ResponseHttp>(environment.apiUrl + 'admin/users')
      .pipe(
        map((data) => {
          return data.data.items;
        }),
        catchError((error) => throwError(error))
      );
  }

  constructor(private httpClient: HttpClient) {}
}
