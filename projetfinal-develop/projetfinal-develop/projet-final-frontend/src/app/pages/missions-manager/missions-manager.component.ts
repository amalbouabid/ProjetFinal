import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MissionsCollaborateursService } from './missions-collaborateurs.service';
import { MatDialog } from '@angular/material';
import { MissionsService } from '../missions-borh/missions.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { UploadFileService } from '../collaborateur-mission/upload/upload-file.service';

@Component({
  selector: 'app-missions-manager',
  templateUrl: './missions-manager.component.html',
  styleUrls: ['./missions-manager.component.scss']
})
export class MissionsManagerComponent implements OnInit {
  panelOpenState = true;
  dataSource;
  ELEMENT_DATA;
  manageurPseudo: String;
  allMissions;
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
  constructor(private uploadFileService: UploadFileService, private toastrService: ToastrService, public dialog: MatDialog, private missionsService: MissionsService, private missionsCollaborateurMissionsService: MissionsCollaborateursService, private datePipe: DatePipe) { }
  allMissionsFromBase;
  historiqueMissions: [] = [];
  ngOnInit() {
    this.allCollaborateursOfManageur();
  }
  allCollaborateursOfManageur() {
    this.manageurPseudo = localStorage.getItem('username');
    return this.missionsCollaborateurMissionsService.findMissionsManagerCollabs(this.manageurPseudo).subscribe(data => {
      
     data = data.filter(item => (item.status != 'DOING' && item.status != 'TODO'));
     console.log('data', data)
      this.allMissions = data;
     this.allMissionsFromBase=data;
      //   this.collaborateurs.forEach(element => {
      //     if (element.tachesMissions.length>0){
      //       console.log(element.mission[0])
      //     this.allMissions.push(element.mission[0])
      //   }
      // });
    }, error => { console.log(error); });
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allMissions, event.previousIndex, event.currentIndex);
  }
  search(term: string) {
    console.log(term)
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
    // console.log(dateTache)
    if (today > dateTache3 && today < dateTache) {
      return "expiration3"
    } else if (today > dateTache) {
      return "expiration"
    } else {
      return "noexpiration"
    }


  }

  annulerMission(id) {
    this.missionsService.annulerMission(id).subscribe(data => {
      console.log(data);
      this.toastrService.success("Mission annulée avec succès", '', this.toastConfig)
      this.allCollaborateursOfManageur();
    },
      () => {
        this.toastrService.error("Problème lors de l'annulation de la mission", '', this.toastConfig)

      }


    )
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Etes-vous sûr de vouloir annuler cette mission?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.annulerMission(id);
        console.log('Yes clicked');

      }
    });
  }
  download(id, fileName) {
    console.log(id)
    this.uploadFileService.downloadFile(id).subscribe(

      data => {
        this.toastrService.info("Fichier " + fileName + " téléchargé", '', this.toastConfig)

        console.log(data)

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
  propagation(event) {
    event.stopPropagation();
  }
}
