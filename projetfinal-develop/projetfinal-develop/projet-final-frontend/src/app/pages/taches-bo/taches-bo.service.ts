import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { TacheMission } from '../models/tache-mission';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class TachesBoService {

  apiURL = 'http://localhost:8080';
    headers =new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {}

  updateTacheMisson(tache :TacheMission): Observable<any> {
    console.log(tache , 'service')
   return this.http.put(this.apiURL + '/taches/update', tache)
  }
  getColaborateurOfMission(id):any {
    return this.http.get(this.apiURL + '/tachesmissions/' + id)
  }

}
