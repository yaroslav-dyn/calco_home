import {Component, OnInit} from '@angular/core';
import {UserModel} from './User.model';
import {RegisterService} from '../../services/register.service';
import { Router } from '@angular/router';
import {ToasterService} from '../../services/toaster.service';
import {Constants} from '../../constants.list';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private user: UserModel;

    regUser: {password: string, email: string} = {
      password: '',
      email: ''
    };

  constructor(
    private registerService: RegisterService,
    private toastService: ToasterService,
    private constantList: Constants,
    private routeReg: Router) {

  }

  ngOnInit() {
    this.user = new UserModel({
      email: '', password: {pwd: '', confirm_pwd: ''},
      terms: false
    });

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
