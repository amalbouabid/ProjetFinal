import { Component, OnInit, ViewChild } from '@angular/core';
import { MissionService } from './mission.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mission } from '../models/mission';
import { ModelService } from '../create-model/model.service';
import { Utilisateur } from '../models/utilisateur';
import { Model } from '../models/model';
import { TaskModel } from '../models/task-model';
import { TacheMission } from '../models/tache-mission';
import { EmailService } from '../email/email.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {
 
  tacheModel: TaskModel;
  tacheMission: TacheMission;
  manageurPseudo :String;
  missionForm;
  typesModel : Model[] ;
  nomCollaborateur : any[] ;
  mesCollaborateurs : Utilisateur[];
  findUserForm;
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
  users: any[]
mission: Mission = new Mission();

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private missionService: MissionService,
     private userService: UserService, private router: Router,
     private toastr: ToastrService, private modelService: ModelService,
     private emailService:EmailService, private datePipe : DatePipe) { }


  ngOnInit() {

    this.missionForm = this.formBuilder.group({
      collaborateur: ['', [Validators.required]],
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      description: ['', [Validators.required]],
      model: ['', [Validators.required]]
    });

    this.modelService.findAllModels().subscribe(data => {
       
            this.typesModel = data; }, error => { console.log(error); });

this.allCollaborateursOfManageur();
this.getUsers();

    }


  missionModel() {
    console.log(this.missionForm.value)
  }

 getUsers() {
      return this.userService.findAllUsers().subscribe(data => {
            console.log('data', data)
            this.nomCollaborateur = data; }, error => { console.log(error); });
    }


    register() {
      let date = new Date();
     let date1 = new Date(this.missionForm.value.dateDebut)
console.log(this.missionForm.value.dateDebut > date);
if(this.missionForm.value.dateFin > this.missionForm.value.dateDebut){
  if(date1 > date){
this.mission.description = this.missionForm.value.description;
this.mission.dateDebut = this.missionForm.value.dateDebut;
this.mission.dateFin = this.missionForm.value.dateFin;
this.mission.collaborateur = this.missionForm.value.collaborateur;
this.mission.model = this.missionForm.value.model;

console.log(this.mission,'mission');
      this.missionService.ajouterMission(this.mission).subscribe(data => {
        this.toastr.success('Création de mission avec succès !', '', this.toastConfig);

        this.sendEmail(this.mission.collaborateur.mail);
        this.missionForm.reset();
        Object.keys(this.missionForm.controls).forEach(key => {
          this.missionForm.controls[key].setErrors(null)})
      }, () => {
        this.toastr.error('Problème lors de l\'ajout !', '', this.toastConfig);
      }, () => {
      });
    }else{
      this.toastr.error('La date de début est inférieure à la date d\'aujourd\'hui', '', this.toastConfig);
    }
        }else{
      this.toastr.error('La date de fin est inférieure à la date de début', '', this.toastConfig);
    }

    }


allCollaborateursOfManageur(){
  this.manageurPseudo = localStorage.getItem('username');
  return this.missionService.findCollaborateursOfManager(this.manageurPseudo).subscribe(data => {
    console.log('data', data)
    this.mesCollaborateurs = data; }, error => { console.log(error); });
}



    sendEmail(mail) {
        // tslint:disable-next-line: max-line-length
        let email = {to: [mail], subject: 'Talan Missions  Vous avez une nouvelle mission !', text: 'Bonjour ' + this.mission.collaborateur.prenom .toUpperCase() + ' ' + this.mission.collaborateur.nom.toUpperCase()  + ' Vous avez été affecté à la mission ' + this.mission.description + '  du '+this.mission.dateDebut+' au '+this.mission.dateFin+'\n Veuillez vous connectez pour entamer les procédures administratives'+'\n Equipe Talan'  }
        this.emailService.envoyerEmail(email);
    }

   
  }
