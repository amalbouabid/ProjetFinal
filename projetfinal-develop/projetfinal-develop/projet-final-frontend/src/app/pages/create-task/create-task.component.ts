import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreatetaskModeleService } from './createtask-modele.service';
import { Model } from '../models/model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,private toastrService:ToastrService,private taskModeleService:CreatetaskModeleService) { }
  taskForm:any;
  ngOnInit() {
    this.taskForm = this.formBuilder.group({

      nom: new FormControl('', [Validators.required]),
      categorie: new FormControl('', [Validators.required]),

      dateEcheance:new FormControl('', [Validators.required]),
    //  modeleId : new FormControl('', [Validators.required])
  });
  }

  ajoutTask(taskModele:any){
    if (this.taskForm.valid) {
      console.log(taskModele)
      this.taskModeleService.ajouterTaskModele( taskModele ).subscribe(data => {
        console.log(data);

      });;
      }

  }
}
