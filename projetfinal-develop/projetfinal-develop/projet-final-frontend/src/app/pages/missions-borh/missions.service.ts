import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  constructor(private http:HttpClient) { }


  findAllMissions():Observable<any[]> {
    console.log('calling user serivce')
    return this.http.get<any[]>('http://localhost:8080/mission');
  }
  annulerMission(id):Observable<any> {
    console.log('calling annuler mission')
    return this.http.put('http://localhost:8080/annulermission/'+id,null);
  }


  
}
