import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { USERS } from '../../mock/mock-users';
import { User } from 'app/pages/models/user';
import { ListCollaborateurService } from './list-collaborateur.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSort, MatDialog } from '@angular/material';
import { DOCUMENT } from '@angular/common';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
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
export class ListUsersComponent implements OnInit, AfterViewInit {
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
  Selecteduser: User;
  FormAdd;
  expanded = false;
  collab: User = {
    id: 25,
    nom: 'string',
    prenom: 'string',
    pseudo: 'string',
    adresse: 'string',
    cin: 'string',
    ville: 'string',
    motDePasse: '',
    codePostal: '',
    mail: '',
    tel: ''
  };
  errorMessage;
  tab;
  columnsToDisplay = [ 'Collaborateur', 'manager', 'actions'];
  expandedElement: User | null;
  ELEMENT_DATA;
  dataSource;
  currentUser: User;
  options ;
  managers;
  colabselected;
  SelectedCollab;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
   @ViewChild('dismissmodal', { static: true }) public dismissmodal: ElementRef;
  // @ViewChild('dismissmodal', { static: true }) public dismissmodal: ModalDirective;

  modalelment;
  constructor(
    private listCollaborateurSevice: ListCollaborateurService,
    private formcol: FormBuilder,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) document) {
    const users: User[] = [];
  }

  ngAfterViewInit() {

    this.modalelment =this.dismissmodal
    console.log(this.modalelment, 'modal');
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  ngOnInit() {
    // this.getCollabByManager();
    this.getAllCollaborateurs();

    this.FormAdd = this.formcol.group({
      manager: [
        '',
        [
          Validators.required,

        ]
      ]
    });

    this.getManagers();

  }
  ngOnChange() {
    this.getAllCollaborateurs();
  }
  affectManagerToCollaborateur(collaborateur) {
  let newColab = {
    id: collaborateur.id,
    motDePasse: collaborateur.motDePasse,
    nom: collaborateur.nom,
    prenom: collaborateur.prenom,
    pseudo: collaborateur.pseudo,
    adresse: collaborateur.adresse,

    ville: collaborateur.ville,
    codePostal: collaborateur.codePostal,
    mail: collaborateur.mail,
    tel: collaborateur.tel,
    manager : this.FormAdd.value.manager,
    role : collaborateur.role
  }

console.log(newColab, 'manger to affect')
    this.listCollaborateurSevice.AffectManager(newColab).subscribe(res => {
    console.log('done')
    this.toastrService.success(
      'Manager affecté avec succés ',
      '',
      this.toastConfig
    );
    //  let dismiss = document.getElementById('dismissModal');
    this.getAllCollaborateurs();
    },
    error => {
      this.toastrService.error(
        'une erreur est survenue lors de l\'affectation manager',
        '',
        this.toastConfig
      );
    })

  }
  myControl = new FormControl();
  // tslint:disable-next-line: max-line-length
  // tslint:disable-next-line: member-ordering

  filteredOptions: Observable<string[]>;

  deleteCollab(id): any {
    this.listCollaborateurSevice.deleteUser(id).subscribe(res => {
      this.getAllCollaborateurs(); console.log(res)
    }
    ,
    error => {
      console.log(error);
      this.toastrService.error(
        'vous ne pouvez pas supprimer ce collaborateur',
        '',
        this.toastConfig
      );
    }
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
  showIcon(i: boolean) {
    return (this.expanded = !this.expanded);
  }
  OnSelected(Selecteduser) {
    console.log(this.Selecteduser);
  }
  getCollabByManager() {
    let pseudo = jwt_decode(localStorage.getItem('token')).sub;
    this.listCollaborateurSevice.getUserByPseudo(pseudo).subscribe(
      data => {
        this.currentUser = data;
        this.listCollaborateurSevice.getCollabyManagerId(data.id).subscribe(res => {

          this.ELEMENT_DATA = res;

          this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);


          this.FormAdd = this.formcol.group({
            manager: [
              '',
              [
                Validators.required,

              ]
            ]
          });
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
          );


        })
      })

  }
  getAllCollaborateurs() {
    this.listCollaborateurSevice.getAllCollab().subscribe(res => {
      console.log(res)
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.FormAdd = this.formcol.group({
        manager: [
          '',
          [
            Validators.required,

          ]
        ]
      });
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
  }
  getManagers(){
    this.listCollaborateurSevice.getManagers().subscribe(res=>{
      this.managers= res;
      console.log(this.managers)
    })
  }

  selectelement(element){
    this.SelectedCollab = element;
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'êtes-vous sûr de vouloir supprimer ce collaborateur ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCollab(id);
        console.log('Yes clicked');
        // DO SOMETHING
      }
    });
  }
}


