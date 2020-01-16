import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'app/pages/models/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string;
  user: User;
  authenticated = false;
  toastConfig = {
    'enableHtml': true,
    'positionClass': 'toast-top-center',
    'closeButton': true,
    'autoDismiss': false,
    'timeOut': 1500,
    'tapToDismiss': false,
    'showEasing': 'swing',
    'hideEasing': 'linear',
    'showMethod': 'fadeIn',
    'hideMethod': 'fadeOut',
    'iconClasses': {
      'error': 'toast-seif',
      'info': 'toast-info',
      'success': 'toast-success',
      'warning': 'toast-warning'
    }
  };
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private toastr: ToastrService) { }


  authenticate(username, password) {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    this.http.post<HttpResponse<any>>('http://localhost:8080/login', body.toString(), {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      observe: 'response'
    })
      .subscribe(
        (res) => {
          this.toastr.success('Connexion avec succès', '', this.toastConfig);

          if (res.status == 200) {
            localStorage.setItem('username', username);

            const token = res.headers.get('Authorization');
            console.log(token);
            let tab = token.split(' ')[1];
            localStorage.setItem('token', tab);

            let jwtData = tab.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)




            console.log(decodedJwtJsonData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            let role = decodedJwtData.roles[0].authority.split('_')[1]

            console.log(role);
            localStorage.setItem('role', role);
console.log(role)
            //ROUTING
            switch (role) {
              case 'COLLABORATEUR': {
                this.router.navigateByUrl('/collaborateurMission');
                break;
              }
              case 'MANAGER': {
                this.router.navigateByUrl('/dossiersEnCoursManager');
                break;
              }
              case 'RH': {
                this.router.navigateByUrl('/dashboard');
                break;
              }
              case 'BO': {
                this.router.navigateByUrl('/tachesBO');
                break;

              }
              case 'BORH': {
                this.router.navigateByUrl('/tachesBORH');
                break;

              }
            }



            return res;
          }
        }, () => {
          this.toastr.error('Problème de connexion', '', this.toastConfig);

        }
      );
  }
  public loggedIn():boolean {
    const Bearertoken = localStorage.getItem('token')
    // const token = this.jwtHelper.decodeToken(Bearertoken)
    // console.log(!this.jwtHelper.isTokenExpired(token))
    return !this.jwtHelper.isTokenExpired(Bearertoken);
  }
  public logout() {
    localStorage.clear();
  }
  getAllUsers() {
    this.http.get('http://localhost:8080/users').subscribe(
      (res) => {

      }
    );
  }
role():any{
  const token = localStorage.getItem('token')
  let jwtData = token.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            let role = decodedJwtData.roles[0].authority.split('_')[1]
            return role;
}
}

