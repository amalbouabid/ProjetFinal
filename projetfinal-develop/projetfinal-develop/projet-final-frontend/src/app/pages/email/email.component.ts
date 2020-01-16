import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmailService } from './email.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  mailForm: any;
  toastConfig = {
    enableHtml: true,
    positionClass: 'toast-top-center',
    closeButton: true,
    autoDismiss: false,
    timeOut: 1500,
    tapToDismiss: false,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
    iconClasses: {
      error: 'toast-seif',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    }
  };
  constructor(private formBuilder: FormBuilder,private emailService:EmailService,private toastrService:ToastrService) { }
  newmail:{'to': string[], 'subject' : string,'text':string}
  tab:string[]=[];
  ngOnInit() {



   this.mailForm = this.formBuilder.group({

      // to: new FormControl('', [Validators.required,Validators.email]),
      subject: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required])

    });
  }

  mail(email: any) {
    console.log(email.to)

  let toS : string ="noreply.byblodetachement@gmail.com";

     this.tab.push(toS)
console.log(this.tab)
    this.newmail={to:this.tab ,
    subject:email.subject,text:email.text}
    if (this.mailForm.valid) {
    console.log(this.newmail,'tttt')
    this.emailService.envoyerEmail(this.newmail);
    this.toastrService.success("Email envoyé avec succès ")
    }
}}
