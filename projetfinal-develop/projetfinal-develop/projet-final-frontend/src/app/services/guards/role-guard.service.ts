import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'app/pages/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class RoleGuardService implements CanActivate {
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
  constructor(private router: Router,private loginService:LoginService,private toastrService:ToastrService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ((this.loginService.role() === next.data.role) && this.loginService.loggedIn()) {
      return true;
    }
     // navigate to not found page
     this.toastrService.error("veuillez vous connecter à nouveau","",this.toastConfig);
     localStorage.clear();
     this.router.navigate(['/login']);

     return false;
   }
  }

