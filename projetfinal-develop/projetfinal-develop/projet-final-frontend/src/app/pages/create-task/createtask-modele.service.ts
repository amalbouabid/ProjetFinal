import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatetaskModeleService {

  constructor(private http: HttpClient) { }
  ajouterTaskModele(taskModele: any):Observable<any>{
   return this.http.post("http://localhost:8080/taskModele", taskModele);
    
  
   }
}
