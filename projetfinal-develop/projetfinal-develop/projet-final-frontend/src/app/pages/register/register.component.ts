import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from '../models/utilisateur';
import { EmailService } from '../email/email.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm;
  utilisateur : Utilisateur = new Utilisateur();
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

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router,
     private toastr: ToastrService, private emailService:EmailService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
    });


  }
  register() {
    console.log(this.registerForm.value.nom);
    this.utilisateur.nom = this.registerForm.value.nom;
    this.utilisateur.prenom = this.registerForm.value.prenom;
    this.utilisateur.mail = this.registerForm.value.mail;
    this.utilisateur.pseudo = this.registerForm.value.nom;
    this.utilisateur.motDePasse = 'talan';
    
    this.registerService.adduser(this.utilisateur).subscribe(data => {
      this.toastr.success('Création de compte avec succès !', '', this.toastConfig);
      let email = {to: [this.utilisateur.mail], subject: 'Mail de Bienvenue', text: 'Mail de Bienvenue \n Bonjour ' +   this.utilisateur.nom + ' ' + this.utilisateur.prenom + ' \n Pour commencer Bienvenue chez Talan.' + 'Pour connecter a votre compte : \n - Nom d utilisateur  :' + this.utilisateur.pseudo  + ' \n - Mot de passe (à changer): ' + this.utilisateur.motDePasse}
      this.emailService.envoyerEmail(email);
       this.router.navigate(['/login']);
    }, () => {
      this.toastr.error("Problème lors de l'enregistrement !", '', this.toastConfig);
    }, () => {

    });

  }
}
