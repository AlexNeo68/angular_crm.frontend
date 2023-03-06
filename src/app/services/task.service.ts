import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { Task } from 'src/app/models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  storeTask(task: Task): Observable<Task> {
    return this.httpClient
      .post<ResponseHttp>(environment.apiUrl + 'admin/tasks', task)
      .pipe(
        map((data) => {
          return data.data.item;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
