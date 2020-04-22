import {Component, OnInit} from '@angular/core';
import {UserModel} from './User.model';
import {RegisterService} from '../../services/register.service';
import { Router } from '@angular/router';
import {ToasterService} from '../../services/toaster.service';
import {Constants} from '../../constants.list';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../services/common.service";
import { MustMatch } from '../../_helpers/must-match.validator';
import {TermsService} from "../../services/terms.service";

@Component({
  selector: 'app-registration',
  template: `
    <div class="half-screen">
      <form [formGroup]="regGroup" (ngSubmit)="onFormSubmit(regGroup)" class="form">
        <mat-form-field floatLabel="never" class="form-element w100">
          <input type="text" matInput placeholder="email" formControlName="email">
          <mat-error *ngIf="regGroup.controls['email'].invalid">
            {{getValidationError('email', regGroup)}}
          </mat-error>
        </mat-form-field>

        <mat-form-field floatLabel="never" class="form-element w100">
          <input type="password" matInput placeholder="Password" formControlName="password">
          <mat-error *ngIf="!regGroup.controls['password'].valid">
            {{getValidationError('pass', regGroup)}}
          </mat-error>
        </mat-form-field>

        <mat-form-field floatLabel="never" class="form-element w100">
          <input type="password" matInput placeholder="Repeat Password" formControlName="repeatPassword">
          <mat-error *ngIf="!regGroup.controls['repeatPassword'].valid">
            {{getValidationError('repeatPassword', regGroup)}}
          </mat-error>
        </mat-form-field>

        <div>
          <mat-checkbox formControlName="termsConditions" class="terms_link">
            <mat-label> I have reed and understood {{constantList.Project.name}}'s</mat-label>
            &#160;
            <app-terms></app-terms>
          </mat-checkbox>
          <mat-error
              *ngIf="!regGroup.controls['termsConditions'].valid && regGroup.controls['termsConditions'].touched">
            {{getValidationError('termsConditions', regGroup)}}
          </mat-error>
        </div>

        <div fxLayout="row" fxLayoutAlign="space-between center" class="service_action__container">
          <a routerLink="/login">{{constantList.getMessage('iHaveAccount')}}</a>
          <button mat-raised-button color="primary" type="submit" class="button"
                  [disabled]="!regGroup.valid">{{constantList.getMessage('signUp')}}</button>
        </div>

      </form>
    </div>
  `,
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public regGroup: FormGroup;
  private user: UserModel;
  passModel: string

    regUser: {password: string, email: string} = {
      password: '',
      email: ''
    };


  constructor(
    private registerService: RegisterService,
    private toastService: ToasterService,
    private constantList: Constants,
    private routeReg: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private termsService: TermsService) {}

  ngOnInit() {
    this.user = new UserModel({
      email: '', password: {pwd: '', confirm_pwd: ''},
      terms: false
    });
    this.createForm();
    this.termsService.termsState.subscribe( state => {
      this.regGroup.controls['termsConditions'].setValue(state);
    })
  }

  get f() { return this.regGroup.controls; }

  createForm() {
    this.regGroup = this.formBuilder.group({
      email : ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword : ['', [Validators.required]],
      termsConditions: ['', [Validators.requiredTrue]]
    },{
      validator: MustMatch('password', 'repeatPassword')
    });
  }


  completeRegister(result) {
    this.routeReg.navigate(['sign-up/thanks']);
  }
  getValidationError(el, formElement) {
    return this.commonService.getError(el, formElement);
  }

  public onFormSubmit({ value }: { value: UserModel}) {
    this.regUser = {
      email: value.email,
      password: value.password
    };

    this.registerService.registerUser(this.regUser).then((res) => {
         this.completeRegister(res);
         this.toastService.showToast('haveBeenRegister ' + this.constantList.Project.name, 'success');
    }, Error => {
      console.log('error', Error.error);
    });

  }

}//
