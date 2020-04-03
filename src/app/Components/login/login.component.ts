import { Component, OnInit } from '@angular/core';
import {Constants} from "../../constants.list";
import {UserModel} from '../registration/User.model';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
import {LoggedState} from '../../services/loggedUser';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
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
    <div class="container content-padding">
<!--      <div class="row">-->
<!--        <div class="col s12 l6 offset-l3">-->
<!--          <form name="sign-in" #signInForm="ngForm" novalidate (ngSubmit)="onFormSubmit(signInForm)">-->

<!--            <div class="row">-->
<!--              <div class="input-field col s12">-->
<!--                <input id="email" type="email" class="validate" name="email" [ngModel]="user.email" #email="ngModel"-->
<!--                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$" required>-->
<!--                <label for="email">Email</label>-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="row" ngModelGroup="password" #userPassword="ngModelGroup">-->
<!--              <div class="input-field col s12">-->
<!--                <input id="password" type="password" class="validate" minlength="6" name="pwd"-->
<!--                       ngModel required>-->
<!--                <label for="password">Password</label>-->
<!--              </div>-->
<!--            </div>-->


<!--            <div class="row">-->
<!--              <div class="col s12 m6 left-align">-->
<!--                <a class="link_to__auth" routerLink="/signUp">-->
<!--                  I DON'T HAVE ACCOUNT-->
<!--                </a>-->
<!--              </div>-->
<!--              <div class="col s12 m6 right-align">-->
<!--                <button class="btn waves-effect waves-light btn-mobile-large" [disabled]="!signInForm.form.valid"-->
<!--                        type="submit">-->
<!--                  Login-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </form>-->
<!--          &lt;!&ndash;  Errors messages&ndash;&gt;-->
<!--          <div class="row">-->
<!--            <div class="col s12 validate-errors">-->
<!--              <div *ngIf="email.invalid && (email.dirty || email.touched)" class="">-->
<!--                <div class="card-panel red lighten-1 white-text" *ngIf="email.errors?.required">-->
<!--                  {{constantList.messages['emailCantBeBlank']}}-->
<!--                </div>-->
<!--                <div class="card-panel red lighten-1 white-text" *ngIf="email.errors?.pattern && email.touched">-->
<!--                  {{constantList.messages['wrongEmailPattern']}}-->
<!--                </div>-->
<!--              </div>-->

<!--              <div class="card-panel red lighten-1 white-text" *ngIf="userPassword.invalid && userPassword.touched;">-->
<!--                {{constantList.messages['passwordLengthError']}}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--        </div>-->
<!--      </div>-->
      <div class="row">

        <mat-form-field class="w100">
          <mat-label>Email</mat-label>
          <input matInput [formControl]="emailFormControl" [errorStateMatcher]="matcher"
                 placeholder="Ex. pat@example.com">
<!--          <mat-hint>Errors appear instantly!</mat-hint>-->
          <mat-error *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
            Please enter a valid email address
          </mat-error>
          <mat-error *ngIf="emailFormControl.hasError('required')">
            Email is <strong>required</strong>
          </mat-error>
        </mat-form-field>

          <mat-form-field class="w100">
            <mat-label>Password</mat-label>
            <input matInput placeholder="Password" >
          </mat-form-field>

        <div fxLayout="row" fxLayoutAlign="space-between center" class="h100">
          <div>
            <a class="link_to__auth" routerLink="/signUp">
              I DON'T HAVE ACCOUNT
            </a>
          </div>
          <div>
            <button mat-stroked-button class="" >
              Login
            </button>
          </div>
        </div>
      </div>
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
  route: any;

  private user: UserModel;

  logUser: {password: string, email: string} = {
    password: '',
    email: ''
  };


  constructor(private constantList: Constants,
              private loginService: LoginService,
              private routeLogin: Router,
              private loggedStateService:  LoggedState
  ) { }


  completeLogin(result) {
    sessionStorage.setItem('loggedUser', result.token);
    this.loggedStateService.loggedState.next(true);
    this.routeLogin.navigate(['profile']);
  }

  public onFormSubmit({ value}: { value: UserModel}) {

    this.logUser = {
      email: value.email,
      password: value.password.pwd
    };
    this.loginService.loginUser(this.logUser).subscribe((res) => {
      this.completeLogin(res);
    }, Error => {
      console.log('error', Error.error);
      console.log(Error.error.message, `Backend returned code ${Error.status}, body was: ${Error.error}`);
    });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.user = new UserModel({
      email: '', password: {pwd: ''},
    });
  }

}
