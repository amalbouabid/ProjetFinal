import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url = "http://localhost:8080/mail";
  constructor(private http: HttpClient) { }
 envoyerEmail(email: any){
  this.http
  .post<HttpResponse<any>>(this.url, email, { observe: "response" })
  .subscribe(data => {
    console.log(data);

  });

 }
}
