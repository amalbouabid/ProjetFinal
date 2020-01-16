import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findAllUsers():Observable<any[]> {
    console.log('calling user serivce')
    return this.http.get<any[]>('http://localhost:8080/utilisateurs');
  }

  
}
