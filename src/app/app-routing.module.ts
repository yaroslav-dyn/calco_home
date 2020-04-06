import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from "./Components/content-components/page-not-found/page-not-found.component";
import { HomeComponent } from "./Components/home/home.component";
import { LoginComponent } from './Components/login/login.component'
import {LoginGuard} from "./services/login-gard.service";
import { RegistrationComponent } from './Components/registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistrationComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
