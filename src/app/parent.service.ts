import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:9080/parenttask';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ParentService {

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

  getParents(): Observable<any> {
    return this.http.get(endpoint).pipe(map(this.extractData));
  }

  getParent(id): Observable<any> {
    return this.http.get(endpoint + '/' + id).pipe(map(this.extractData));
  }

  addParent(parent): Observable<any> {
    console.log(parent);
    return this.http.post<any>(endpoint, JSON.stringify(parent), httpOptions).pipe(
      tap((parent) => console.log(`added parent w/ id=${parent.parentId}`)),
      catchError(this.handleError<any>('addParent'))
    );
  }

  updateParent(id, parent): Observable<any> {
    return this.http.put(endpoint + '/' + id, JSON.stringify(parent), httpOptions).pipe(
      tap(_ => console.log(`updated parent id=${id}`)),
      catchError(this.handleError<any>('updateParent'))
    );
  }

  deleteParent(id): Observable<any> {
    return this.http.delete<any>(endpoint + '/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted parent id=${id}`)),
      catchError(this.handleError<any>('deleteParent'))
    );
  }
}
