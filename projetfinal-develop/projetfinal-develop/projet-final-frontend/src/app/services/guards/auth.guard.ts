import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../pages/login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router,private jwtHelper:JwtHelperService){

  }
    canActivate(): boolean {
      if (this.loginService.loggedIn()) {
        return true;
      } else {
        this.router.navigateByUrl('login')
        localStorage.clear();
        return false;
      }
    }
}
