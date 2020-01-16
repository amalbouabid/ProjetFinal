import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { User } from 'app/pages/models/user';
import { UpdateMissionService } from './update-mission.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Mission } from '../models/mission';
import { TacheMission } from '../models/tache-mission';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-update-mission',
  templateUrl: './update-mission.component.html',
  styleUrls: ['./update-mission.component.scss']
})


export class UpdateMissionComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;

  idMission: number;
  missionModifie: Mission = new Mission();
  tachesMissions: TacheMission[];
  tachesToDelete: any[] = [];
  today;
  users: User[];
  Selecteduser: User;
  updateMissionForm;
  findMissionForm;
  addTaskForm;
  missionExiste: boolean;
  mission;
  missionModel;
  missionUser;
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

  categories = [
    'DOCUMENT',
    'PROCEDURE'
  ]

  constructor(private datePipe: DatePipe, public dialog: MatDialog, private toastrService: ToastrService, private formBuilder: FormBuilder, private userService: UserService, private updateMissionService: UpdateMissionService) { }

  ngOnInit() {
    this.today = Date.now();
    this.getUsers();

    this.findMissionForm = this.formBuilder.group({
      collaborateur: ['', [Validators.required]],

    });

    this.updateMissionForm = this.formBuilder.group({
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      description: ['', [Validators.required]],
      model: [{ value: '', disabled: true }, [Validators.required]]

    });
    this.addTaskForm = this.formBuilder.group({
      nomTache: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dateAffectation: ['', [Validators.required]],
      dateEcheance: ['', [Validators.required]],
      utilisateur: ['', [Validators.required]],
    })
    this.addTaskForm.setValue({
      nomTache: '',
      categorie: '',
      description: '',
      dateAffectation: this.datePipe.transform(this.today, 'yyyy-MM-dd'),
      dateEcheance: '',
      utilisateur: ''
    })
  }

  getUsers() {
    return this.userService.findAllUsers().
      subscribe(data => {
        data=data.filter(el => el.role.libelle === 'COLLABORATEUR');
        this.users = data; 
      }, error => { console.log(error); });
  }
  findMission(findMissionForm) {
    this.missionUser=findMissionForm.value.collaborateur;
    return this.updateMissionService.findMissionByCollaborateur(findMissionForm.value.collaborateur.id).
      subscribe(data => {
        this.mission = data;
        this.idMission = this.mission.id;
        console.log(this.idMission)
        this.missionModel=this.mission.model;

        this.missionExiste = true;
        setTimeout(function () {
          window.scroll({ top: 415, behavior: "smooth" })

        }, 200);
        this.updateValues(this.mission)


      }, error => {
        console.log(error);
        this.toastrService.error("Pas de mission pour ce collaborateur", "", this.toastConfig)
        this.missionExiste = false;
      });;

  }

  // scroll(id) {
  //   console.log(`scrolling to ${id}`);
  //   let el = document.getElementById(id);
  //   el.scrollIntoView({behavior:"smooth"});
  // }


  updateValues(values: any) {
    this.tachesMissions = values.tachesMissions;
    console.log(this.tachesMissions)

    this.updateMissionForm.setValue({
      dateDebut: this.datePipe.transform(values.dateDebut, 'yyyy-MM-dd'),
      dateFin: this.datePipe.transform(values.dateFin, 'yyyy-MM-dd'),
      description: values.description,
      model: values.model.type.split('_')[0] + " " + values.model.type.split('_')[1] + " " + values.model.designation.toUpperCase(),
      // tachesMissions:values.tachesMissions
    });
  }
  updateMission(g) {
    console.log('g vlua')
    console.log(g.value)
    this.missionModifie.id = this.idMission;
    this.missionModifie.dateDebut = g.value.dateDebut;
    this.missionModifie.dateFin = g.value.dateFin;
    this.missionModifie.dateDebut = g.value.dateDebut;
    this.missionModifie.description = g.value.description;
    this.missionModifie.tachesMissions = this.tachesMissions;
    this.missionModifie.collaborateur = this.missionUser;
    this.missionModifie.model = this.missionModel;
    console.log(this.missionModifie.tachesMissions)
    this.updateMissionService.modifierMission(this.missionModifie)
      .subscribe(
        (data) => {
          console.log(data)
          this.mission=data;
          this.tachesToDelete.forEach(id => {
            if (id != undefined)
              this.updateMissionService.deleteTache(id).subscribe(
                (data) => {
                  console.log(data)
                }
              );
          }
            ,

            this.toastrService.success("Mission modifiée avec succès", "", this.toastConfig)

          );

        }, () => {
          this.toastrService.error("Erreur lors de la modification de mission", "", this.toastConfig)

        }
      )
      ;
  }
  addTask(h) {
    console.log(h.value)
    this.tachesMissions.push(h.value)
    this.toastrService.success("Tâche ajoutée avec succès", "", this.toastConfig)

    console.log(this.tachesMissions)
    this.tachesMissions;
    this.closeModal.nativeElement.click();
    this.addTaskForm.reset();

  }
  deleteTask(i) {
    console.log(this.tachesMissions[i])
    this.tachesToDelete.push(this.tachesMissions[i].id)
    console.log("tasks to be deleted=" + this.tachesToDelete)
    delete this.tachesMissions[i];
    this.tachesMissions;

  }
  openDialog(g): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Etes-vous sûr de vouloir modifier cette mission?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMission(g);
        console.log('Yes clicked');
        // DO SOMETHING
      }
    });
  }
}
