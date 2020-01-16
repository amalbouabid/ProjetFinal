import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterService } from 'app/pages/register/register.service';
import { ModelService } from './model.service';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task-model';
import { ToastrService } from 'ngx-toastr';
import { Model } from '../models/model';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Role } from '../models/role';

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.scss']
})
export class CreateModelComponent implements OnInit {
  title = 'angular-confirmation-dialog';
  roles: Role[];

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
  models: Model[];
  model: Model = new Model();
  modelForm;
  listeTaches: TaskModel[] = new Array();
  listePapiers: TaskModel[] = new Array();
  show: boolean = false;
  buttonName: any = 'Show';
  taskForm: any;
  papierForm: any;
  types = ['Court séjour', 'Long séjour'];
  categories = ['DOCUMENT', 'PROCEDURE'];
  /*  Roles=[
    'Manageur',
    'Collaborateur',
    'BO',
    'BORH'
  ] */

  etat;
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private modelService: ModelService,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
    this.taskForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      dateEcheance: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
    this.papierForm = this.formBuilder.group({
      nom: ['', [Validators.required]]
    });

    this.allRoles();
  }

  createModel() {
    if (this.modelForm.value.type === 'Court séjour') {
      this.modelForm.value.type = 'COURT_SEJOUR';
    } else if (this.modelForm.value.type === 'Long séjour') {
      this.modelForm.value.type = 'LONG_SEJOUR';
    }
    console.log(this.modelForm.value.description);

    this.model.description = this.modelForm.value.description;
    this.model.designation = this.modelForm.value.designation;
    this.model.type = this.modelForm.value.type;
    this.model.taskModels = this.listeTaches;
    console.log(this.model.taskModels, 'list es task all');

    this.model.taskModels = this.listeTaches.concat(this.listePapiers);
    console.log(
      this.model.taskModels,
      'list es task all after concxal',
      this.listePapiers
    );
    this.modelService.addModel(this.model).subscribe(
      data => {
        console.log(data);
        this.modelForm.reset();
        Object.keys(this.modelForm.controls).forEach(key => {
          this.modelForm.controls[key].setErrors(null);
        });
        // this.modelForm.controls.controlName.updateValueAndValidity()

        this.toastrService.success(
          'Modèle créé avec succès ',
          '',
          this.toastConfig
        );
      },
      () => {
        this.toastrService.error(
          'Problème lors de la creation de modele',
          '',
          this.toastConfig
        );
      }
    );

    this.listeTaches = new Array();
    this.listePapiers = new Array();
  }

  allModels() {
    this.modelService.findAllModels().subscribe(
      data => {
        this.models = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  allRoles() {
    return this.modelService.findAllRole().subscribe(
      data => {
        this.roles = data;
        console.log(this.roles, 'roles');
      },
      error => {
        console.log(error);
      }
    );
  }

  ajoutTask() {
    if (this.taskForm.value.categorie == 'DOCUMENT') {
      this.modelForm.value.categorie = 'DOCUMENT';
    } else if (this.modelForm.value.categorie == 'PROCEDURE') {
      this.modelForm.value.categorie = 'PROCEDURE';
    }
    let task: TaskModel = new TaskModel()
    task={
      nom : this.taskForm.value.nom,

      dateEcheance: this.taskForm.value.dateEcheance,
      categorie: this.taskForm.value.categorie,
      role: this.taskForm.value.role,
      priorite: 'p1'
    };
    this.listeTaches.push(task);
    console.log(task);
    this.taskForm.reset();
    Object.keys(this.taskForm.controls).forEach(key => {
      this.taskForm.controls[key].setErrors(null);
    });
    return this.listeTaches;
  }

toggle() {
  this.show = !this.show;
}
deleteTask(i) {
  delete this.listeTaches[i];
  this.listeTaches;

}


  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createModel();
        console.log('Yes clicked');
        // DO SOMETHING
      }
    });
  }

  ajoutPapier() {
    // this.modelForm.value.categorie = 'DOCUMENT'
    let roleCollab = this.roles.filter(el => el.libelle === 'COLLABORATEUR');
    console.log(roleCollab, 'role');
    let papier: TaskModel = {
      nom: this.papierForm.value.nom,
      dateEcheance: '7',
      categorie: 'DOCUMENT',
      role: roleCollab[0],
      priorite: 'p0'
    };
    this.listePapiers.push(papier);
    console.log(papier, this.listePapiers);
    this.papierForm.reset();
        Object.keys(this.papierForm.controls).forEach(key => {
          this.papierForm.controls[key].setErrors(null);
        });
    return this.listePapiers;
  }
}
