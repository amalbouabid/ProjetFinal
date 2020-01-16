import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { ListUsersComponent } from 'app/pages/list-users/list-users.component';
import { RoleGuardService } from 'app/services/guards/role-guard.service';
import { CollaborateurMissionComponent } from 'app/pages/collaborateur-mission/collaborateur-mission.component';
import { CreateModelComponent } from 'app/pages/create-model/create-model.component';
import { MissionComponent } from 'app/pages/mission/mission.component';
import { GestionCollaborateurComponent } from 'app/pages/gestion-collaborateur/gestion-collaborateur.component';
import { UpdateMissionComponent } from 'app/pages/update-mission/update-mission.component';
import { MissionsManagerComponent } from 'app/pages/missions-manager/missions-manager.component';
import { MissionsBORHComponent } from 'app/pages/missions-borh/missions-borh.component';
import { TachesManagerComponent } from 'app/pages/taches-manager/taches-manager.component';
import { CurrentMManagerComponent } from 'app/pages/current-m-manager/current-m-manager.component';
import { CurrentMBorhComponent } from 'app/pages/current-m-borh/current-m-borh.component';
import { TachesBOComponent } from 'app/pages/taches-bo/taches-bo.component';
import { TachesBORHComponent } from 'app/pages/taches-borh/taches-borh.component';
import {ProfilComponent} from 'app/pages/profil/profil.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'mission', component: MissionComponent },
    {
        path: 'collaborateurMission', component: CollaborateurMissionComponent
        , canActivate: [RoleGuardService],
        data: {
            role: 'COLLABORATEUR'
        }
    },

    { path: 'upgrade', component: UpgradeComponent },
    {
        path: 'listUtilisateur', component: ListUsersComponent
        , canActivate: [RoleGuardService],
        data: {
            role: 'BO'
        }
    },
    { path: 'createModel', component: CreateModelComponent },

    {
        path: 'gestionCollaborateur', component: GestionCollaborateurComponent
        , canActivate: [RoleGuardService],
        data: {
            role: 'BO'
        }
    },

    {
        path: 'updateMission', canActivate: [RoleGuardService],
        data: {
            role: 'BORH'
        }
        , component: UpdateMissionComponent
    },
    { path: 'missions', canActivate: [RoleGuardService],
    data: {
        role: 'BORH'
    }
    , component: MissionsBORHComponent },
    { path: 'missionsCollaborateurs', canActivate: [RoleGuardService],
    data: {
        role: 'MANAGER'
    }
    , component: MissionsManagerComponent },
    { path: 'tachesManager', canActivate: [RoleGuardService],
    data: {
        role: 'MANAGER'
    }
    , component: TachesManagerComponent },
    { path: 'dossiersEnCoursManager', canActivate: [RoleGuardService],
    data: {
        role: 'MANAGER'
    }
    , component: CurrentMManagerComponent },
    { path: 'dossiersEnCoursBORH', canActivate: [RoleGuardService],
    data: {
        role: 'BORH'
    }
    , component: CurrentMBorhComponent },
    { path: 'tachesBO', canActivate: [RoleGuardService],
    data: {
        role: 'BO'
    }
    , component: TachesBOComponent },
    { path: 'tachesBORH', canActivate: [RoleGuardService],
    data: {
        role: 'BORH'
    }
    , component: TachesBORHComponent },

    {path: 'profile' , component: ProfilComponent},
    { path: 'tachesCollaborateur', canActivate: [RoleGuardService],
    data: {
        role: 'COLLABORATEUR'
    }, component: CollaborateurMissionComponent}


];
