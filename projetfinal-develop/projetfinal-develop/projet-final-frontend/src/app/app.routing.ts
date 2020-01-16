import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


import { AuthGuard } from './services/guards/auth.guard';


import { CreateModelComponent } from './pages/create-model/create-model.component';
import { EmailComponent } from './pages/email/email.component';
export const AppRoutes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '', canActivate: [AuthGuard],
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mail', component: EmailComponent }





]
