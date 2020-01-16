import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { EmailComponent } from './pages/email/email.component';
import { CollaborateurComponent } from './pages/collaborateur/collaborateur.component';
import { RegisterComponent } from './pages/register/register.component';
import { PrintErrorComponent } from './print-error/print-error.component';
import { MissionComponent } from './pages/mission/mission.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HttpErrorInterceptorService } from './services/http-error-interceptor.service';
import { UtilisateurComponent } from './pages/utilisateur/utilisateur.component';
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { DataTablesModule } from 'angular-datatables';
import {configuration} from './configuration';
import {UploadFileService} from './pages/collaborateur-mission/upload/upload-file.service';





@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    CollaborateurComponent,
    AdminLayoutComponent,
    LoginComponent,
    LoginComponent,
    RegisterComponent,
    PrintErrorComponent,
    UtilisateurComponent,
    EmailComponent,
   
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot({
      // positionClass: 'toast-bottom-right'
    }),
    FooterModule,
    FixedPluginModule,
    MatFormFieldModule,
    NgSelectModule,
    NgxSpinnerModule,
    DataTablesModule,
    MatFormFieldModule,


  ],

  providers: [DatePipe, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    configuration,
    UploadFileService,{

      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
