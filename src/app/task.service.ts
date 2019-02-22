import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:9080/task';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getTasks(): Observable<any> {
    return this.http.get(endpoint).pipe(map(this.extractData));
  }

  getTask(id): Observable<any> {
    return this.http.get(endpoint + '/' + id).pipe(map(this.extractData));
  }

  addTask(task): Observable<any> {
    console.log(task);
    return this.http.post<any>(endpoint, JSON.stringify(task), httpOptions).pipe(
      tap((task) => console.log(`added task w/ id=${task.taskId}`)),
      catchError(this.handleError<any>('addTask'))
    );
  }

  updateTask(id, task): Observable<any> {
    return this.http.put(endpoint + '/' + id, JSON.stringify(task), httpOptions).pipe(
      tap(_ => console.log(`updated task id=${id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  deleteTask(id): Observable<any> {
    return this.http.delete<any>(endpoint + '/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted task id=${id}`)),
      catchError(this.handleError<any>('deleteTask'))
    );
  }
}
