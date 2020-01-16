import { Component, OnInit } from '@angular/core';
import { MissionsService } from './missions.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UploadFileService } from '../collaborateur-mission/upload/upload-file.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-missions-borh',
  templateUrl: './missions-borh.component.html',
  styleUrls: ['./missions-borh.component.scss']
})
export class MissionsBORHComponent implements OnInit {
  panelOpenState = true;
  dataSource;
  ELEMENT_DATA;
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
  constructor(private uploadFileService:UploadFileService,public dialog: MatDialog,private missionsService: MissionsService, private datePipe: DatePipe, private toastrService:ToastrService) { }
  allMissionsFromBase;
  allMissions;
  ngOnInit() {
    this.getAllMissions();
  }

  getAllMissions() {
    return this.missionsService.findAllMissions().subscribe(data => {
      data = data.filter(item => (item.status != 'DOING' && item.status != 'TODO'));

      console.log('data', data)
      this.allMissions = data;
      this.allMissionsFromBase=data;

    }, error => { console.log(error); });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allMissions, event.previousIndex, event.currentIndex);
  }
  search(term: string) {
    this.allMissions = this.allMissionsFromBase;

    console.log(term)
    if (term) {
      this.allMissions = this.allMissions.filter(x => (x.collaborateur.prenom.toLowerCase().includes(term.trim().toLowerCase()))
      || (x.collaborateur.nom.includes(term.trim().toLowerCase())));
    }
  }

  expiration(dateExpiration): string {
    const today = new Date();

    const dateTache3 = new Date(dateExpiration)
    dateTache3.setDate(dateTache3.getDate() - 3);
    const dateTache = new Date(dateExpiration)
    dateExpiration = this.datePipe.transform(dateExpiration, 'yyyy-MM-dd')
    if (today > dateTache3 && today < dateTache) {
      return "expiration3"
    } else if (today > dateTache) {
      return "expiration"
    } else {
      return "noexpiration"
    }


  }

  annulerMission(id){

this.missionsService.annulerMission(id).subscribe(data =>{
  console.log(data);
  this.toastrService.success("Mission annulée avec succès",'',this.toastConfig)
  this.getAllMissions();
},
  ()=>{
    this.toastrService.error("Problème lors de l'annulation de la mission",'',this.toastConfig)

  }


  )
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Etes-vous sûr de vouloir annuler cette mission?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.annulerMission(id);
        console.log('Yes clicked');

      }
    });
  }
download(id,fileName){
  console.log(id)
  this.uploadFileService.downloadFile(id).subscribe(

    data => {

        console.log(data)
        this.toastrService.info("Fichier "+fileName+" téléchargé",'',this.toastConfig)

          const downloadedFile = new Blob([data], { type: data.type });
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = fileName;
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);

    }
  )
}
propagation(event){
  event.stopPropagation();
}
}
