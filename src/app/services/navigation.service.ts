import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Navigation } from 'src/app/models/navigation';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private httpClient: HttpClient) {}

  getNavigation(): Observable<Navigation[]> {
    return this.httpClient
      .get<ResponseHttp>(environment.apiUrl + 'admin/menus')
      .pipe(
        map((data) => data.data.items),
        catchError((error) => {
          console.log('Error - ', error);
          throw new Error(error);
        })
      );
  }
}
