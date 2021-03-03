import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './Components/content-components/page-not-found/page-not-found.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import {Constants} from './constants.list';
import { LoginComponent } from './Components/login/login.component';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import {LoggedState} from './services/loggedUser';
import {LoaderService} from './services/preload.service';
import { LoaderInterceptorService } from './services/preload-interceptor.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RegistrationComponent} from './Components/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './Components/content-components/loader/loader.component';
import {TermsComponent} from './Components/content-components/modals/terms/terms.component';
import {TermsModalComponent} from './Components/content-components/modals/terms/terms-modal.component';
import {MaterialModule} from './material.module';
import {LoginGuard} from './services/login-gard.service';
import { StorageModule } from '@ngx-pwa/local-storage';
import { PostRegistrationComponent } from './Components/registration/post/post-registration.component';
import { ConverterComponent } from './Components/converter/converter.component';
import { CountdownModule } from 'ngx-countdown';
import { TimerComponent } from './Components/timer/timer.component';
import { NotesComponent } from './Components/notes/notes.component';
import { AcceptModalComponent } from './Components/content-components/modals/accept-modal/accept-modal.component';
import { NoteEditorComponent } from './Components/content-components/modals/note-editor/note-editor.component';
import { MatchPipe } from './_helpers/pipes/match.pipe';
import { ReminderComponent } from './Components/reminder/reminder.component';
import { RemaindEditorComponent } from './Components/content-components/modals/remained-editor/remaind-editor.component';
import { ReminderCardComponent } from './Components/reminder/reminder-card/reminder-card.component';
import {FormatDate} from './_helpers/pipes/formatDate';
import { ReminderControlsComponent } from './Components/reminder/reminder-controls/reminder-controls.component';
import { VocabularyComponent } from './Components/vocabulary/vocabulary.component';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import { QrGeneratorComponent } from './Components/qr-generator/qr-generator.component';
import { ProfileComponent } from './Components/profile/profile.component';
import {FileUploaderComponent} from './Components/content-components/file-uploader';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    TermsComponent,
    LoaderComponent,
    TermsComponent,
    TermsModalComponent,
    PostRegistrationComponent,
    ConverterComponent,
    TimerComponent,
    NotesComponent,
    AcceptModalComponent,
    NoteEditorComponent,
    MatchPipe,
    FormatDate,
    ReminderComponent,
    RemaindEditorComponent,
    ReminderCardComponent,
    ReminderControlsComponent,
    VocabularyComponent,
    QrGeneratorComponent,
    ProfileComponent,
    FileUploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StorageModule.forRoot({ IDBNoWrap: true }),
    CountdownModule,
    NgxQRCodeModule
  ],
  providers: [Constants, LoginService, RegisterService, LoggedState, LoaderService, LoaderInterceptorService, LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [TermsModalComponent, AcceptModalComponent, NoteEditorComponent, RemaindEditorComponent]
})
export class AppModule { }
