import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { TacheMission } from '../models/tache-mission';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurMissionService {

    // Define API
    apiURL = 'http://localhost:8080';
    headers =new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {}

  public getAll<T>(): Observable<T> {
    return this.http.get<T>(this.apiURL + '/taches',{ headers: this.headers });
  }

  public getTacheMissionByUser(idUser: number): any {
    return this.http.get(this.apiURL+'/taches/' + idUser)
    ;
  }
  
  public getTacheUser(idUser: number): any {
    return this.http.get(this.apiURL+'/tachesCollaborateur/' + idUser)
    ;
  }

  updateTacheMisson(tache :TacheMission): Observable<any> {
    console.log(tache , 'service')
   return this.http.put(this.apiURL+'/taches/update', tache)
  }

  notifManager(pseudo){
    console.log("email envoyé");
   this.http.get(this.apiURL+'/mailManager/' + pseudo).subscribe(
      data => {console.log(data); 
      }
    )
  }

  public getTacheUserPriorite(idUser: number): any {
    console.log(idUser,'jjjlxl<jcxqdjczjdnbvjdsczan')
    return this.http.get(this.apiURL+'/tachesCollaborateurPriorite/' + idUser)
    ;
  }


  addModel(model:any): Observable<any>{
    return this.http.post('http://localhost:8080/model', model);
  }

  ajouterTache(mission):Observable<any> {
    return  this.http.put<any>('http://localhost:8080/ajoutTache',mission);
  }
  updateTacheM(tache :TacheMission,id){
    this.http.put(this.apiURL+'/taches/updateM?idMission='+id, tache).subscribe(
       error => {console.log(error); }
     )
   }
  }
