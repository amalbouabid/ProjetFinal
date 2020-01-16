import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateMissionService {

  constructor(private http:HttpClient) { }

  findMissionByCollaborateur(idUser:number):Observable<any> {
    console.log('calling user serivce')
    return  this.http.get<any[]>('http://localhost:8080/mission/collab?id='+idUser)
    ;
  }
  modifierMission(missionModifie):Observable<any> {
    return  this.http.put<any>('http://localhost:8080/mission',missionModifie)
    ;
  }
  deleteTache(id):Observable<any>{
    return  this.http.delete<any>('http://localhost:8080/tache/'+id)
  
  }
}
