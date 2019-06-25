import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { INews } from '../interface/news';
import { Icategory } from '../interface/category';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  private newsAPIUrl: string = 'http://localhost:8080/api/news';
  private categoryAPIUrl: string = 'http://localhost:8080/api/categorys';
  constructor(private http: HttpClient) { }
  
  public getNews(): Observable<INews[]>{
    return this.http.get<INews[]>(this.newsAPIUrl)
    .pipe(catchError(this.errorHandler));
  }
  public getNewById(id){
    return this.http.get<INews>(this.newsAPIUrl+"/"+id)
    .pipe(catchError(this.errorHandler));
  }

  public getCategory(): Observable<Icategory[]>{
    return this.http.get<Icategory[]>(this.categoryAPIUrl)
    .pipe(catchError(this.errorHandler));
}

public createNew(news) {
  return this.http.post<INews[]>(this.newsAPIUrl, news)
  .pipe(catchError(this.errorHandler));
}

public updateNew(news, id) {
  return this.http.put<INews[]>(this.newsAPIUrl+"/"+id, news)
  .pipe(catchError(this.errorHandler));
}

public deleteNew(ids){
  return this.http.delete<void>(this.newsAPIUrl, ids)
  .pipe(catchError(this.errorHandler));
}

  public errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }
}
