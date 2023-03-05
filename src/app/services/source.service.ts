import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { Source } from 'src/app/models/source';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  getSources(): Observable<Source[]> {
    return this.httpClient
      .get<ResponseHttp>(environment.apiUrl + 'admin/sources')
      .pipe(
        map((data) => {
          return data.data.items;
        }),
        catchError((error) => throwError(error))
      );
  }

  constructor(private httpClient: HttpClient) {}
}
