import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import { GestionCollaborateurService } from './gestion-colaborateur.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EmailService } from '../email/email.service';
@Component({
  selector: 'app-gestion-collaborateur',
  templateUrl: './gestion-collaborateur.component.html',
  styleUrls: ['./gestion-collaborateur.component.scss']
})
export class GestionCollaborateurComponent implements OnInit {
   Selecteduser: any;

  addColForm: any;
  listColab;
  listManager;
  options: string [];
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
  myControl = new FormControl();
  // tslint:disable-next-line: max-line-length

  filteredOptions: Observable<string[]>;
  constructor(private formBuilder: FormBuilder,
    private gestionCollaborateurService: GestionCollaborateurService,private toastr: ToastrService,private router:Router,
    private emailService:EmailService) { 
    
    }

  ngOnInit() {
    this.addColForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
      Selecteduser:['', [Validators.required]]
    });

    this.getManagers()
  }

  addcol() {

    this.gestionCollaborateurService.getUserByPseudo(this.Selecteduser.split(' ')[0]).subscribe(
      res => {

        let managerToAdd = res;
        let  newCol = {

          nom : this.addColForm.value.nom ,
          prenom : this.addColForm.value.prenom,
           mail: this.addColForm.value.email,
           manager: managerToAdd,
          motDePasse : ' talantalan',

          pseudo: this.addColForm.value.prenom ,


          }

           this.gestionCollaborateurService.addUser(newCol).subscribe(data => {
            this.toastr.success('Ajout du collaborateur avec succès !', '', this.toastConfig);
            // tslint:disable-next-line: max-line-length
            let email = {to: [this.addColForm.value.email], subject: 'Mail de Bienvenue', text: 'Mail de Bienvenue \n Bonjour ' +   this.addColForm.value.nom + ' ' + this.addColForm.value.prenom + ' \n Pour commencer Bienvenue chez Talan.' + 'Pour connecter a votre compte : \n - Nom d utilisateur  :' + this.addColForm.value.prenom  + ' \n - Mot de passe (à changer): ' + newCol.motDePasse}
            this.emailService.envoyerEmail(email);
            setTimeout(() => {
             this.router.navigate(['/listUtilisateur']);
            }, 1500);

            // this.router.navigate(['/login']);
          }, () => {
            this.toastr.error('Problème lors de l\'ajout !', '', this.toastConfig);
          }, () => {

          });
        })




  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  OnSelected(Selecteduser) {
    this.Selecteduser = Selecteduser;
    console.log(this.Selecteduser);
  }
  getManagers() {
    this.gestionCollaborateurService.getAllCollab().subscribe(data => {
      this.listColab = data;
      console.log(data, 'getallcollab')
      this.listManager = this.listColab.filter(el => el.role.libelle == 'MANAGER' ? el : null );
      console.log(this.listManager, 'list lmanan')
      this.options =  this.listManager.map(el => `${el.pseudo} ${el.nom}`);
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      console.log(this.listColab, this.listManager, this.options)
    })
  }


}
