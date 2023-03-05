import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { Unit } from 'src/app/models/unit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private httpClient: HttpClient) {}

  getUnits(): Observable<Unit[]> {
    return this.httpClient
      .get<ResponseHttp>(environment.apiUrl + 'admin/units')
      .pipe(
        map((data) => {
          return data.data.items;
        }),
        catchError((error) => throwError(error))
      );
  }
}
