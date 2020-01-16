import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'app/pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  http: any;

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token') != null) {
      console.log('INTERCEPTING !!!!!');
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+localStorage.getItem('token')

        }

      });


      return next.handle(tokenizedReq);
    }
    else return next.handle(req);
  }

}
