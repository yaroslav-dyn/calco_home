import {Component, OnInit} from '@angular/core';
import {UserModel} from './User.model';
import {RegisterService} from '../../services/register.service';
import { Router } from '@angular/router';
import {ToasterService} from '../../services/toaster.service';
import {Constants} from '../../constants.list';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-registration',
  template: `
    <div class="half-screen">
      <form [formGroup]="regGroup" (ngSubmit)="onFormSubmit(regGroup)" class="form">
        <mat-form-field floatLabel="never" class="form-element w100">
          <input type="text" matInput placeholder="email" formControlName="email">
          <mat-error *ngIf="regGroup.controls['email'].invalid">
            {{getError('email')}}
          </mat-error>
        </mat-form-field>

        <mat-form-field floatLabel="never" class="form-element w100">
          <input type="password" matInput placeholder="Password" formControlName="password">
          <mat-error *ngIf="!regGroup.controls['password'].valid">
            {{getError('pass')}}
          </mat-error>
        </mat-form-field>

        <mat-form-field floatLabel="never" class="form-element w100">
          <input type="password" matInput placeholder="Repeat Password" formControlName="repeatPassword">
          <mat-error *ngIf="!regGroup.controls['repeatPassword'].valid">
            {{getError('repeatPassword')}}
          </mat-error>
        </mat-form-field>

        <div fxLayout="row" fxLayoutAlign="space-between center">
          <a routerLink="/sign-up">{{constantList.getMessage('haveNotAccount')}}</a>
          <button mat-raised-button color="primary" type="submit" class="button" [disabled]="!regGroup.valid">{{constantList.getMessage('signUp')}}</button>

        </div>

      </form>
    </div>
  `,
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public regGroup: FormGroup;
  private user: UserModel;

    regUser: {password: string, email: string} = {
      password: '',
      email: ''
    };

  constructor(
    private registerService: RegisterService,
    private toastService: ToasterService,
    private constantList: Constants,
    private routeReg: Router,
    private formBuilder: FormBuilder ) {}

  ngOnInit() {
    this.user = new UserModel({
      email: '', password: {pwd: '', confirm_pwd: ''},
      terms: false
    });
    this.createForm();

  }

  createForm() {
    this.regGroup = this.formBuilder.group({
      'email': ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  getError(el) {
    switch (el) {
      case 'email':
        if (this.regGroup.get('email').hasError('required')) {
          return 'email required';
        } else if (this.regGroup.get('email').hasError('pattern')) {
          return 'invalid email';
        }
        break;
      case 'pass':
        if (this.regGroup.get('password').hasError('required')) {
          return this.constantList.messages.passwordsDontMatch
        } else if (this.regGroup.get('password').hasError('minlength')) {
          return this.constantList.messages.passwordLengthError
        }
        break;
      default:
        return '';
    }
  }


  completeRegister(result) {
    this.routeReg.navigate(['signUp/thanks']);
    localStorage.setItem('currentUser', result.token);
  }

  public onFormSubmit({ value, valid}: { value: UserModel, valid: boolean }) {
    this.regUser = {
      email: value.email,
      password: value.password.pwd
    };


    this.registerService.registerUser(this.regUser).subscribe((res) => {
          this.completeRegister(res);
          this.toastService.showToast('haveBeenRegister ' + this.constantList.Project.name, 'success');
    }, Error => {
      console.log('error', Error.error);
    });

  }

}//
