import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private router: Router) { }


  adduser(user: any): Observable<any> {
   return this.http.post<HttpResponse<any>>("http://localhost:8080/utilisateur", user, { observe: "response" });
        // if (data.status == 200) {
        //   this.router.navigateByUrl("/login");
        //   alert("Création de compte avec succès !");

        // } else {
        //   alert("Création de compte échoué !");
        // }
      
  }
}
