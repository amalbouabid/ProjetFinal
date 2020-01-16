import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
 } from '@angular/common/http';
 import { Observable, throwError } from 'rxjs';
 import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
           /*  errorMessage = `Error: ${error.error.message}`; */
           errorMessage = `Error`;
          } else {
            // server-side error
            /* errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; */
            errorMessage = `Error`;
          }
         // window.alert(errorMessage);
         console.log(errorMessage)
          return throwError(errorMessage);
        })
      )
  }
}
