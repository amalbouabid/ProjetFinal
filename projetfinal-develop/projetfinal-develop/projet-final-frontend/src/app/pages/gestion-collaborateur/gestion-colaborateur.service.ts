import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { USERS } from '../../mock/mock-users';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class GestionCollaborateurService {
  collaborateurs = USERS;
  url = 'http://localhost:8080/utilisateur/';
  constructor(private http: HttpClient) {}
  addUser(user): any {

    return this.http.post(this.url,user);

  }
  editUser(user: User) {
    this.collaborateurs.filter(el => (el.id === user.id ? (el = user) : el));
    console.log(this.collaborateurs, 'edit');
  }
  deleteUser(id) {
    console.log(id, 'user');
    this.http.delete('http://localhost:8080/utilisateur/' + id);
  }
  getCollabyManagerId(id) {
    return this.http.get(this.url + id)
  }
  getUserByPseudo(pseudo: string): any {
console.log(pseudo.split(" ")[0])
      return this.http.get('http://localhost:8080/parPseudo/' + pseudo.split(" ")[0]);
  }
  getAllCollab(){
    return this.http.get('http://localhost:8080/utilisateurs' )
  }

}
