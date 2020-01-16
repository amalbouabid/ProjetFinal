import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };
  loginForm;
  constructor(private formLogin: FormBuilder, private loginService: LoginService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
     /** spinner starts on init */
     this.spinner.show();
   
     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 2000);
    this.loginForm = this.formLogin.group({
      username:['', [Validators.required]],
      password:['', [Validators.required]]
    });
    console.log(this.loginForm)
    // this.loginForm.get('username').valid=true;
    // if(this.loginForm.)
  }
  
 
  login() {
    this.credentials = this.loginForm.value;
    // if(this.loginForm.valid){
    this.loginService.authenticate(this.credentials.username, this.credentials.password);
    // }
  }
  // get username() { return this.loginForm.get('username'); }

  
}
