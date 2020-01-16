import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../email/email.service';
import { User } from '../models/user';
import { ListCollaborateurService } from '../list-users/list-collaborateur.service'

import { profilservice } from './profil.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  users: User[];
  user:User;
  id;
  motDePasse;
  profilForm;
  currentUser;
  registerForm;
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
  // tslint:disable-next-line:max-line-length
  constructor(    private emailService:EmailService ,private toastrService: ToastrService, private formBuilder: FormBuilder, private profileService: profilservice, private listCollaborateurService: ListCollaborateurService, ) { }

  ngOnInit() {
    this.getuserInfo();
    this.registerForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      password: ['', [Validators.required]],
      oldPassword:['', [Validators.required]],
      confirmPassword:['', [Validators.required]],
    });

  }

  getuserInfo() {

    let pseudo = localStorage.getItem('username');
    console.log(pseudo)
    this.listCollaborateurService.getUserByPseudo(pseudo).subscribe(
      data => {
        this.currentUser = data;
        console.log(this.currentUser)
this.id=data.id;
console.log(this.id)
        this.registerForm.setValue({
          nom: this.currentUser.nom,
          prenom: this.currentUser.prenom,
          password: '',
          oldPassword: '',
          confirmPassword: ''
        })

      })
}






  modifProfile(value){
if(value.password === value.confirmPassword) {

    this.profileService.modifProfile(this.id,value.nom,value.prenom,value.password,value.oldPassword).subscribe(
      data=>{
        console.log(data)
 this.toastrService.success("Profil modifié avec succès", "", this.toastConfig)
  // tslint:disable-next-line:max-line-length
  let email = {to: [this.currentUser.mail], subject: 'Edit Profil', text: 'Votre profil a été modifié avec succès' }
   this.emailService.envoyerEmail(email);

 },
    ()=>{
     this.toastrService.error("Veuillez vérifier votre mot de passe", "", this.toastConfig)

   }

  )
}
else
{
  this.toastrService.error("Veuillez confirmer votre mot de passe", '', this.toastConfig)

}
   }

  

}

