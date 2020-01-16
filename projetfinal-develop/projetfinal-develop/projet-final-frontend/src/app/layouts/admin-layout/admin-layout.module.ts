import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { ListUsersComponent } from '../../pages/list-users/list-users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollaborateurMissionComponent } from 'app/pages/collaborateur-mission/collaborateur-mission.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../../pages/autocomplete/module'

import { DemoMaterialModule } from '../../pages/collaborateur-mission/material-module';
import { from } from 'rxjs';
import { CreateModelComponent } from 'app/pages/create-model/create-model.component';
import { MissionComponent } from 'app/pages/mission/mission.component';

import { AutocompleteComponent } from 'app/pages/autocomplete/autocomplete.component';
import { MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatPaginatorModule } from '@angular/material';
import { CreateTaskComponent } from 'app/pages/create-task/create-task.component';
import { GestionCollaborateurComponent } from '../../pages/gestion-collaborateur/gestion-collaborateur.component';
import { UpdateMissionComponent } from 'app/pages/update-mission/update-mission.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfirmationDialogComponent } from 'app/pages/confirmation-dialog/confirmation-dialog.component';
import { DataTablesModule } from 'angular-datatables';
import { MissionsManagerComponent } from 'app/pages/missions-manager/missions-manager.component';
import { MissionsBORHComponent } from 'app/pages/missions-borh/missions-borh.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { TachesManagerComponent } from 'app/pages/taches-manager/taches-manager.component';
import { CurrentMManagerComponent } from 'app/pages/current-m-manager/current-m-manager.component';
import { CurrentMBorhComponent } from 'app/pages/current-m-borh/current-m-borh.component';
import { TachesBOComponent } from 'app/pages/taches-bo/taches-bo.component';
import { TachesBORHComponent } from 'app/pages/taches-borh/taches-borh.component';
import { ProfilComponent } from '../../pages/profil/profil.component';
import { FileValueAccessor } from 'app/pages/collaborateur-mission/FileValueAccessor';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DemoMaterialModule,
    MaterialModule,
    MatAutocompleteModule,
    MatButtonModule,
    NgSelectModule,
    DataTablesModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FlexLayoutModule,
    NgxPaginationModule
  ],
  declarations: [
    DashboardComponent,
    AutocompleteComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    ListUsersComponent,
    MissionsBORHComponent,
    CollaborateurMissionComponent,
    CreateModelComponent,
    MissionComponent,
    CreateTaskComponent,
    UpdateMissionComponent,
    GestionCollaborateurComponent,
    ConfirmationDialogComponent,
    MissionsManagerComponent,
    TachesManagerComponent,
    CurrentMManagerComponent,
    CurrentMBorhComponent,
     TachesBOComponent,
    TachesBORHComponent,
    ProfilComponent,
    FileValueAccessor,
  ], 
  entryComponents: [ConfirmationDialogComponent],
})

export class AdminLayoutModule { }
