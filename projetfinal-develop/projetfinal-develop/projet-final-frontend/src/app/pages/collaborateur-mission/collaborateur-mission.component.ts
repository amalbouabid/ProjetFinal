import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { trigger, state, style, transition, animate } from
    '@angular/animations';
import { MISSIONCO } from '../mocks/mock-collaborateur-mission';
import { CollaborateurMission } from '../models/collaborateur-mission';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse,
  HttpEventType} from '@angular/common/http';
import {CollaborateurMissionService} from './collaborateur-mission.service';
import {UploadFileService} from './upload/upload-file.service';
import { ListCollaborateurService } from '../list-users/list-collaborateur.service';
import { TacheMission } from '../models/tache-mission';
import { Utilisateur } from '../models/utilisateur';
import * as jwt_decode from 'jwt-decode';
import {FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-collaborateur-mission',
  templateUrl: './collaborateur-mission.component.html',
  styleUrls: ['./collaborateur-mission.component.scss'],
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
export class CollaborateurMissionComponent implements OnInit {
 x=0;
  passport:boolean = false;
  visa:boolean = false;


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
  mission :Mission;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private listCollaborateurSevice: ListCollaborateurService,
              private collaborateurMissionService:CollaborateurMissionService,
              private uploadService: UploadFileService,
              private formBuilder : FormBuilder,
              private toastrService: ToastrService,) { }
columnsToDisplay = [
     'Description','Date validité','Document','Commentaire','Soumission'];
      expandedElement: CollaborateurMission | null;

//   columnsToDisplay = [ 'Nom Prenom', 'Date Affectation',
// 'Date Echeance', 'Task', 'Description','Action'];
//  expandedElement: CollaborateurMission | null;


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  ngOnInit() {
    this.getTacheMissionByUser();
    console.log(localStorage.getItem('username'))

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
  if(( this.selectedFiles == undefined || this.commentaire == undefined) && tache.categorie == "DOCUMENT" ){

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




getTacheMissionByUser() {

let pseudo = localStorage.getItem('username');
console.log(this.listCollaborateurSevice.getUserByPseudo(pseudo));
this.listCollaborateurSevice.getUserByPseudo(pseudo).subscribe(res=>{
 this.user= res
  console.log(this.user,'user')
  this.collaborateurMissionService.getTacheUser(this.user.id).subscribe((data: any[]) =>  {
         this.tachesUser = data;
       console.log(this.tachesUser ,'taches')
        this.ELEMENT_DATA=this.tachesUser ;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;},
        error => () => {
          console.log('error', 'Damn', 'Something went wrong...');
        },
        () => {
          console.log('success', 'Complete', 'Getting all values complete');
          console.log(this.tachesUser)
        });

  })

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

  this.collaborateurMissionService.updateTacheMisson(tache).subscribe(res=>{

    this.ELEMENT_DATA.splice(this.ELEMENT_DATA.indexOf(tache), 1)
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.removeFile();
    this.msgError = false
    this.commentaire = ''
    // this.dateTachform.reset()
    this.selectedFiles = undefined
 
  })

  let missionsLength = this.user.mission.length
  this.collaborateurMissionService.updateTacheM(tache,this.user.mission[missionsLength-1].id);
  console.log(tache.status + 'update tache');
  //  location.reload();
  this.rmvfile = false






   let pseudo = jwt_decode(localStorage.getItem('token')).sub;
   let tacheMissions: TacheMission[] = new Array();

    console.log("******************"+this.user.id)
    this.collaborateurMissionService.getTacheUserPriorite(this.user.id).subscribe(
      data => {console.log(data);
        let i = 1;
        for (let index = 0; index <data.length; index++) {
           const tacheMission = data[index];
           // console.log(tacheMission.status);
          console.log("index"+index)
          console.log(data[index].status == 'DONE')
              if(tacheMission.status == 'DONE'){
            i = i+1;
            console.log("i="+i)

        }
        console.log(this.user.mission+'liste missionnnnnnnnnnnn');
       console.log( this.user.mission)
       this.mission = this.user.mission[missionsLength-1];
        console.log("i="+i)
        console.log(data.length)
        console.log(i == data.length);
        if(i == data.length){
          console.log("envois email")
          this.x=this.x+1;
          if (this.x=1){
        this.collaborateurMissionService.notifManager(pseudo);
        this.toastrService.success("Votre manager a été informé","",this.toastConfig)
          }
        this.listCollaborateurSevice.getUserByPseudo(pseudo).subscribe(
          data=>{
            let mission=data.mission[missionsLength-1]
            console.log("taches missions "+mission.tachesMissions)
            for (let index = 0; index < mission.tachesMissions.length; index++) {
              const element = mission.tachesMissions[index];
              if(element.priorite =='p1'){
                element.status = 'DOING'
                console.log("tache "+element.status)

                this.collaborateurMissionService.updateTacheMisson(element)
              }
            }



          }
        )


        }



      }
this.getTacheMissionByUser();
      })





    }
    this.x=0;
  }
//trying add comment
getComment(value){
  let com = value
  this.commentaire=com.value;
  console.log(com.value,'commmm')
  this.toastrService.success(
    'Commentaire ajouté avec succes',
    '',
    this.toastConfig
  );
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

}
