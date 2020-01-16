import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  url = 'http://localhost:8080/mission';

  constructor(private http: HttpClient) { }
  ajouterMission(mission: any): Observable<any> {
    return this.http
    .post(this.url, mission)
   }
   findCollaborateursOfManager(managerPseudo:String): Observable<any>{
    return this.http.get('http://localhost:8080/collaborateursManager?managerPseudo='+managerPseudo);
}

}





