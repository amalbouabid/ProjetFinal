import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/pages/login/login.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Menu', icon: 'nc-bank', class: '', role: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '',role:'BO' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    //  { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },

    // { path: '/login',       title: 'Login',    icon:'nc-spaceship',  class: '' },
    //  { path: '/mail', title: 'Contact', icon: 'nc-email-85', class: '', role: '' },

    { path: '/tachesBORH', title: 'Mes tâches', icon: 'nc-single-copy-04', class: '', role: 'BORH' },
    { path: '/dossiersEnCoursBORH', title: 'Dossiers en cours', icon: 'nc-paper', class: '', role: 'BORH' },
    { path: '/updateMission', title: 'Modifier Mission', icon: 'nc-refresh-69', class: '', role: 'BORH' },
    { path: '/createModel', title: 'Nouveau Modèle', icon: 'nc-paper', class: '', role: 'BORH' },
    { path: '/missions', title: 'Historique', icon: 'nc-box', class: '', role: 'BORH' },


    { path: '/tachesManager', title: 'Mes tâches', icon: 'nc-single-copy-04', class: '', role: 'MANAGER' },
    { path: '/dossiersEnCoursManager', title: 'Dossiers en cours', icon: 'nc-paper', class: '', role: 'MANAGER' },
    { path: '/mission', title: 'Nouvelle mission', icon: 'nc-briefcase-24', class: '', role: 'MANAGER' },
    { path: '/missionsCollaborateurs', title: 'Historique', icon: 'nc-box', class: '', role: 'MANAGER' },


    { path: '/tachesBO', title: 'Mes tâches', icon: 'nc-single-copy-04', class: 'ajout', role: 'BO' },
    { path: '/listUtilisateur', title: 'Liste des collaborateurs', icon: 'nc-badge', class: '', role: 'BO' },
    { path: '/gestionCollaborateur', title: 'Ajouter collaborateur', icon: 'nc-circle-10', class: 'ajout', role: 'BO' },


    { path: '/tachesCollaborateur', title: 'Mes Tâches', icon: 'nc-tag-content', class: '', role: 'COLLABORATEUR' },




];
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    styleUrls: ['./sidebar.component.css'],
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    constructor(private loginService: LoginService) { }
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    role(): string {
        return this.loginService.role();
    }
}
