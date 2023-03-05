import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  addSaleCount(): Observable<number> {
    return this.http
      .get<ResponseHttp>(environment.apiUrl + 'admin/leads/addSale/count')
      .pipe(
        map((data) => {
          return data.data.number;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  constructor(private http: HttpClient) {}
}
