import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";
import { PageNotFoundComponent } from './Components/content-components/page-not-found/page-not-found.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {Constants} from './constants.list';
import { LoginComponent } from './Components/login/login.component'
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import {LoginGuard} from "./services/loginGuard.service";
import {LoggedState} from "./services/loggedUser";
import {LoaderService} from "./services/preload.service";
import { LoaderInterceptorService } from './services/preload-interceptor.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RegistrationComponent} from "./Components/registration/registration.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiUsersInfoComponent} from "./Components/content-components/api-users-info/api-users-info.component";
import {LoaderComponent} from "./Components/content-components/loader/loader.component";
import {TermsComponent} from "./Components/content-components/terms/terms.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    TermsComponent,
    ApiUsersInfoComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,

    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [Constants, LoginService, RegisterService, LoginGuard, LoggedState, LoaderService, LoaderInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
