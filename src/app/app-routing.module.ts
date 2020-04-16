import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from "./Components/content-components/page-not-found/page-not-found.component";
import { HomeComponent } from "./Components/home/home.component";
import { LoginComponent } from './Components/login/login.component'
import { LoginGuard } from "./services/login-gard.service";
import { RegistrationComponent } from './Components/registration/registration.component';
import { PostRegistrationComponent } from "./Components/registration/post/post-registration.component";
import { ConverterComponent } from  './Components/converter/converter.component'
import {TimerComponent} from "./Components/timer/timer.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistrationComponent },
  { path: 'sign-up/thanks', component: PostRegistrationComponent },
  { path: 'converter', component: ConverterComponent },
  { path: 'timer', component: TimerComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
