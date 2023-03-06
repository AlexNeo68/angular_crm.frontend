import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Lead } from 'src/app/models/lead';
import { ResponseHttpLead } from 'src/app/models/response-http-lead';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  getLeads(): Observable<{
    process: Lead[];
    new: Lead[];
    done: Lead[];
  }> {
    return this.http
      .get<ResponseHttpLead>(environment.apiUrl + 'admin/leads')
      .pipe(
        map((data) => {
          return data.data.items;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

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

  storeLead(lead: Lead): Observable<Lead> {
    return this.http
      .post<ResponseHttp>(environment.apiUrl + 'admin/leads', lead)
      .pipe(
        map((data) => {
          return data.data.item;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  updateLead(lead: Lead): Observable<Lead> {
    return this.http
      .put<ResponseHttp>(environment.apiUrl + 'admin/leads/' + lead.id, lead)
      .pipe(
        map((data) => {
          return data.data.item;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  checkLead(lead: Lead): Observable<{ exist: boolean; item: Lead }> {
    return this.http
      .post<ResponseHttp>(environment.apiUrl + 'admin/leads/create/check', lead)
      .pipe(
        map((data) => {
          return {
            exist: data.data.exist,
            item: data.data.item,
          };
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
