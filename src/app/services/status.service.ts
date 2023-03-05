import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { Status } from 'src/app/models/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private httpClient: HttpClient) {}

  getStatuses(): Observable<Status[]> {
    return this.httpClient
      .get<ResponseHttp>(environment.apiUrl + 'admin/statuses')
      .pipe(
        map((data) => {
          return data.data.items;
        }),
        catchError((error) => throwError(error))
      );
  }
}
