import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { USERS } from '../../mock/mock-users';
import { User } from 'app/pages/models/user';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ListCollaborateurService {
  collaborateurs = USERS;
  url = 'http://localhost:8080/utilisateur/';
  constructor(private http: HttpClient) {}
  AffectManager(user): any {

    return this.http.put(this.url,user);

  }

  deleteUser(id):any {
    console.log(id, 'user');
   let res= this.http.delete('http://localhost:8080/utilisateur/' + id);
    console.log(res, 'user');
    return res;
  }
  getCollabyManagerId(id) {
    return this.http.get(this.url + id)
  }
  getUserByPseudo(pseudo: String): any {
console.log(pseudo)
      return this.http.get('http://localhost:8080/parPseudo/' + pseudo);
  }
  getAllCollab() {
    return this.http.get('http://localhost:8080/collaborateursManagers' )
  }
  getManagers() {
    return this.http.get(' http://localhost:8080/managers' )
  }

  getUserPseudo(){
          return this.http.get('http://localhost:8080/byPseudo/');
      }
}
