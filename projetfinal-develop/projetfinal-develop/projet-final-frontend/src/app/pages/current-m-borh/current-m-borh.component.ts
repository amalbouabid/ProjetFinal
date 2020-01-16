import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../collaborateur-mission/upload/upload-file.service';
import { MatDialog } from '@angular/material';
import { MissionsService } from '../missions-borh/missions.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CurrentMManagerService } from '../current-m-manager/current-m-manager.service';

@Component({
  selector: 'app-current-m-borh',
  templateUrl: './current-m-borh.component.html',
  styleUrls: ['./current-m-borh.component.scss']
})
export class CurrentMBorhComponent implements OnInit {
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
  constructor(private currentMManagerService: CurrentMManagerService, private uploadFileService: UploadFileService, public dialog: MatDialog, private missionsService: MissionsService, private datePipe: DatePipe, private toastrService: ToastrService) { }
  allMissionsFromBase;
  allMissions;
  ngOnInit() {
    this.getAllMissions();
  }

  getAllMissions() {
    return this.missionsService.findAllMissions().subscribe(data => {
      data = data.filter(item => (item.status != 'DONE' && item.status != 'CANCELED' && item.status != 'TODO'));

      console.log('data', data)
      this.allMissions = data;
      this.allMissionsFromBase = data;

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

  annulerMission(id) {

    this.missionsService.annulerMission(id).subscribe(data => {
      console.log(data);
      this.toastrService.success("Mission annulée avec succès", '', this.toastConfig)
      this.getAllMissions();
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

        console.log(data)
        this.toastrService.info("Fichier " + fileName + " téléchargé", '', this.toastConfig)

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
  validerDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Etes-vous sûr de vouloir valider cette mission?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.validerMission(id);
        console.log('Yes clicked');

      }
    });
  }
  validerMission(id) {

    this.currentMManagerService.validerMission(id).subscribe(data => {
      console.log(data);
      this.toastrService.success("Mission validée avec succès", '', this.toastConfig)
      this.getAllMissions();
    },
      () => {
        this.toastrService.error("Problème lors de la validation de la mission", '', this.toastConfig)

      }


    )
  }
}