import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router, NavigationStart} from '@angular/router';
import {PageNotFoundComponent} from './Components/content-components/page-not-found/page-not-found.component';
import {HomeComponent} from './Components/home/home.component';
import {LoginComponent} from './Components/login/login.component';
import {LoginGuard} from './services/login-gard.service';
import {RegistrationComponent} from './Components/registration/registration.component';
import {PostRegistrationComponent} from './Components/registration/post/post-registration.component';
import {ConverterComponent} from './Components/converter/converter.component';
import {TimerComponent} from './Components/timer/timer.component';
import {NotesComponent} from './Components/notes/notes.component';
import {ReminderComponent} from './Components/reminder/reminder.component';
import {VocabularyComponent} from './Components/vocabulary/vocabulary.component';
import {QrGeneratorComponent} from './Components/qr-generator/qr-generator.component';
import {ProfileComponent} from './Components/profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'sign-up', component: RegistrationComponent},
  {path: 'sign-up/thanks', component: PostRegistrationComponent},
  {path: 'converter', component: ConverterComponent},
  {path: 'timer', component: TimerComponent},
  {path: 'notes', component: NotesComponent},
  {path: 'notes', component: NotesComponent},
  {path: 'reminder', component: ReminderComponent},
  {path: 'vocabulary', component: VocabularyComponent},
  {path: 'qr-generator', component: QrGeneratorComponent},
  {path: '**', component: PageNotFoundComponent}
];

class NavigationEvent {
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {

    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }
    });
  }
}//
