import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { trigger, state, style, transition, animate }from '@angular/animations';

import { CollaborateurMission } from '../models/collaborateur-mission';
import { HttpResponse,HttpEventType} from '@angular/common/http';

import {UploadFileService} from  '../collaborateur-mission/upload/upload-file.service'
import { ListCollaborateurService } from '../list-users/list-collaborateur.service';
import { TacheMission } from '../models/tache-mission';
import { Utilisateur } from '../models/utilisateur';
import * as jwt_decode from 'jwt-decode';
import {FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TachesBoService } from '../taches-bo/taches-bo.service';
import { GestionCollaborateurService } from '../gestion-collaborateur/gestion-colaborateur.service';
import { CollaborateurMissionService } from '../collaborateur-mission/collaborateur-mission.service';
import { TachesUtilisateurService } from '../taches-manager/taches-utilisateur.service';

@Component({
  selector: 'app-taches-borh',
  templateUrl: './taches-borh.component.html',
  styleUrls: ['./taches-borh.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class TachesBORHComponent implements OnInit {
  nameTab=[];
  tab;
  id: number;
  taches;
  dateTachform;
  rmvfile: boolean = false;
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
  idfile;
  select;
  boolean:Boolean;
  tache:TacheMission;
  user:Utilisateur;
  tachesUser: any[] ;
  currentuser: Utilisateur;
  tasksMission:any;
  ELEMENT_DATA;
  dataSource;
  selectedFiles: FileList;
  currentFileUpload: File;
  filename;
  commentaire='';
  uploadForm;
  fileForm;
  submited:boolean = false;
  msgError: boolean =false;
  msgerror2: boolean =false;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private listCollaborateurSevice: ListCollaborateurService,
              private tachesBoService:TachesBoService,
              private uploadService: UploadFileService,
              private formBuilder : FormBuilder,
              private toastrService: ToastrService,
              private collaborateurMissionService:CollaborateurMissionService,
              private gestionCollaborateurService:GestionCollaborateurService,
              private tachesUtilisateurService:TachesUtilisateurService) { }
columnsToDisplay = [
     'Description','Collaborateur','Date validité','Document','Commentaire','Soumission'];
      expandedElement: CollaborateurMission | null;

//   columnsToDisplay = [ 'Nom Prenom', 'Date Affectation',
// 'Date Echeance', 'Task', 'Description','Action'];
//  expandedElement: CollaborateurMission | null;


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  ngOnInit() {
    this.getTacheMissionByUser();
this.dateTachform = this.formBuilder.group({
  date:''
})

    this.uploadForm = this.formBuilder.group({
      text:''

    });

    this.fileForm = this.formBuilder.group({
     file:''

    });
  }
//   ngAfterViewChecked() {
// this.getTacheMissionByUser()
//   }
  selectFile(event,index) {
    this.selectedFiles = event.target.files;
    if (event.target.files.length > 0) {
      console.log(event.target.files[0].name);
      this.filename = event.target.files[0].name
    }
    this.select =index ;
    console.log(index,this.select,'index')
  }

getselectedfilename(index){
    this.select =index ;
}
 //uploading file method
 uploadFile(tache: TacheMission ,date) {
  if(( this.selectedFiles == undefined || this.commentaire == undefined) && tache.categorie == "DOCUMENT" ) {

    this.toastrService.error(
      'tous les champs sont obligatoires',
      '',
      this.toastConfig
    );
  }
  console.log(tache, 'yjfffkjhgkfgkjf')
  if(tache.categorie =='DOCUMENT'){
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event=> {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {

        console.log('File is completely uploaded!' ,JSON.parse(event.body).fileDownloadUri.substr(35))

        this.idfile=JSON.parse(event.body).fileDownloadUri.substr(35);
        this.updateTache( tache ,date)
      }
    },
    );
  }
   else{

      this.updateTache( tache ,date)
    }
    // this.selectedFiles = undefined;

  }




getTacheMissionByUser(){

const pseudo = localStorage.getItem('username')
this.gestionCollaborateurService.getUserByPseudo(pseudo).subscribe(
  data => {
    this.id = data.id;
    this.tachesUtilisateurService.findTachesUtilisateur(this.id).subscribe(
      data => {
        this.tachesUser = data;
        console.log(this.tachesUser ,'taches')
         this.ELEMENT_DATA=this.tachesUser ;
         this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
         this.dataSource.paginator = this.paginator;
         this.tab =  this.ELEMENT_DATA.map(el =>el.id)
         this.colabMissionNames()
        },
         error => () => {
           console.log('error', 'Damn', 'Something went wrong...');
         },
         () => {
           console.log('success', 'Complete', 'Getting all values complete');
           console.log(this.tachesUser)
         });
      }
    )
}
changerStatus(status:string) {
let a :string;
  if (status=== 'DOING'){
    status = 'DONE';

  }
  a=status;
  return a;

}

updateTache(tache: TacheMission ,date) {
  tache.status = this.changerStatus(tache.status);
  tache.commentaire = this.commentaire;
if(date !== null)
   {tache.dateValidation= date;}

this.dateTachform.reset()


  if(tache.dateValidation.toString() == '' || date == null ){
    this.msgError = true
    console.log(this.msgError,'dcck')
    }
    else{
  console.log('file')
  if(tache.categorie =='DOCUMENT'){
  tache.dbFile = {
    id : this.idfile
  }}

  this.tachesBoService.updateTacheMisson(tache).subscribe(res=>{

    this.ELEMENT_DATA.splice(this.ELEMENT_DATA.indexOf(tache), 1)
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.removeFile();
    this.msgError = false
    this.commentaire = ''
    // this.dateTachform.reset()
    this.selectedFiles =undefined


  })
  this.rmvfile =false
    }
}

//trying add comment
getComment(value){
  let com = value
  this.commentaire=com.value;

this.uploadForm.reset();

  return com
}
removeFile(){
    this.fileForm.value = ''
    this.filename=''

  console.log(this.fileForm.value,'value form')
}
changerEtat(){
  this.rmvfile= !this.rmvfile;
  console.log(this.rmvfile,'fillllllll')
}
isSubmit(index){

  this.submited = true

}

findTachesUtilisateur() {
  const pseudo = localStorage.getItem('username')
  this.gestionCollaborateurService.getUserByPseudo(pseudo).subscribe(
    data => {
      this.id = data.id;
      this.tachesUtilisateurService.findTachesUtilisateur(this.id).subscribe(
        data => {
          this.taches = data;
          console.log("taches" + this.taches)
        }
      )

    }
  )



}

colabMissionNames(): any {
  for(let i=0;i<this.tab.length;i++){
   this.tachesBoService.getColaborateurOfMission(this.tab[i])
    .subscribe(data => {
     const mission: any = data
   this.nameTab.push(mission.collaborateur.nom +' '+ mission.collaborateur.prenom);
    })
  }

  }


}
