import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TachesUtilisateurService {

  constructor(private http:HttpClient) { }

  findTachesUtilisateur(id):Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/tachesCollaborateur/'+id);
  }
}
