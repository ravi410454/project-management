import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:9080/project';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

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

  getProjects(): Observable<any> {
    return this.http.get(endpoint).pipe(map(this.extractData));
  }

  getProject(id): Observable<any> {
    return this.http.get(endpoint + '/' + id).pipe(map(this.extractData));
  }

  addProject(project): Observable<any> {
    console.log(project);
    return this.http.post<any>(endpoint, JSON.stringify(project), httpOptions).pipe(
      tap((project) => console.log(`added project w/ id=${project.projectId}`)),
      catchError(this.handleError<any>('addProject'))
    );
  }

  updateProject(id, project): Observable<any> {
    return this.http.put(endpoint + '/' + id, JSON.stringify(project), httpOptions).pipe(
      tap(_ => console.log(`updated project id=${id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  deleteProject(id): Observable<any> {
    return this.http.delete<any>(endpoint + '/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted project id=${id}`)),
      catchError(this.handleError<any>('deleteProject'))
    );
  }
}
