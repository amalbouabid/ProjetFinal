import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Model } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
model:Model;
  constructor(private http: HttpClient) { }

  addModel(model:any): Observable<any>{
    return this.http.post('http://localhost:8080/model', model);
  }

  findAllModels(): Observable<any>{
     return this.http.get('http://localhost:8080/models');
  }

  findAllRole(): Observable<any>{
    return this.http.get('http://localhost:8080/roles');
}
}