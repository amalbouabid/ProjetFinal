import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentMManagerService {

  constructor(private http:HttpClient) { }

  validerMission(id):Observable<any> {
    console.log('calling valider mission')
    return this.http.put('http://localhost:8080/validerMission/'+id,null);
  }

}
