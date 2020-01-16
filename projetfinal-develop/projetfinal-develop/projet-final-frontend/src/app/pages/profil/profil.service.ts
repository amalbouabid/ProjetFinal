import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class profilservice {

  constructor(private http:HttpClient) { }



  modifProfile(id,nom,prenom,password,oldPassword) :any {
    return  this.http.get('http://localhost:8080/user/updatePassword?id='+id+'&nom='+nom+'&prenom='+prenom+'&password='+password+'&oldPassword='+oldPassword)

  }

  
}
