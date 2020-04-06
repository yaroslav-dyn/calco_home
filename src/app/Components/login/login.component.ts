import { Component, OnInit } from '@angular/core';
import {Constants} from "../../constants.list";
import {UserModel} from '../registration/User.model';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
import {LoggedState} from '../../services/loggedUser';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  template: `
    <div class="half-screen">
      <form [formGroup]="loginGroup" (ngSubmit)="onFormSubmit(loginGroup)" class="form">
        <mat-form-field floatLabel="never" class="form-element w100">
          <input type="text" matInput placeholder="email" formControlName="email">
          <mat-error *ngIf="loginGroup.controls['email'].invalid">
            {{getError('email')}}
          </mat-error>
        </mat-form-field>

        <mat-form-field floatLabel="never" class="form-element w100">
          <input type="password" matInput placeholder="Password" formControlName="password">
          <mat-error *ngIf="!loginGroup.controls['password'].valid">
            {{getError('pass')}}
          </mat-error>
        </mat-form-field>

        <div fxLayout="row" fxLayoutAlign="space-between center">
            <a routerLink="/sign-up">{{constantList.getMessage('haveNotAccount')}}</a>
            <button mat-raised-button color="primary" type="submit" class="button" [disabled]="!loginGroup.valid">{{constantList.getMessage('login')}}</button>

        </div>

      </form>
    </div>

  `,
  styles: [
    `.link_to__auth {
        padding: 7px 0;
        display: inline-block;
      }
    `
  ]
})
export class LoginComponent implements OnInit {

  public loginGroup: FormGroup;


  logUser: {password: string, email: string} = {
    password: '',
    email: ''
  };


  constructor(private constantList: Constants,
              private loginService: LoginService,
              private routeLogin: Router,
              private loggedStateService:  LoggedState,
              private formBuilder: FormBuilder
  ) { }


  completeLogin(result) {
    sessionStorage.setItem('loggedUser', result.token);
    this.loggedStateService.loggedState.next(true);
    this.routeLogin.navigate(['profile']);
  }


  public onFormSubmit( { value}: { value: UserModel}) {

    this.logUser = {
      email: value.email,
      password: value.password.pwd
    };
    this.loginService.loginUser(this.logUser);
  }



  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginGroup = this.formBuilder.group({
      'email': ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  getError(el) {
    switch (el) {
      case 'email':
        if (this.loginGroup.get('email').hasError('required')) {
          return 'email required';
        } else if (this.loginGroup.get('email').hasError('pattern')) {
          return 'invalid email';
        }
        break;
      case 'pass':
        if (this.loginGroup.get('password').hasError('required')) {
          return this.constantList.messages.passwordsDontMatch
        } else if (this.loginGroup.get('password').hasError('minlength')) {
          return this.constantList.messages.passwordLengthError
        }
        break;
      default:
        return '';
    }
  }

}
