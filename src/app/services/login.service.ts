import { Injectable } from '@angular/core';
import { Constants } from '../constants.list';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { LoggedState } from './loggedUser';
import { ToasterService } from './toaster.service';

@Injectable()
export class LoginService {
  _baseUrl: string;

  constructor(private constantList: Constants,
              private storage: StorageMap,
              private routeLogin: Router,
              private loggedStateService: LoggedState,
              private toast: ToasterService) {

  }

   loginUser(user) {
     this.storage.get(user.email, { type: 'string' }).subscribe({
       next: (data) => {
             if (data && data ===  user.password) { this.completeLogin(); }
             else if (!data) { this.toast.showToast('userNotFound', 'error'); }
             else {  this.toast.showToast('incorrectLoginData', 'error'); }
         },
       error: (error) => { console.log('error', error); },
     });
  }

  completeLogin() {
    localStorage.setItem('loggedUser', 'true');
    this.loggedStateService.loggedState.next(true);
    this.routeLogin.navigate(['']);
  }

  checkLogin() {
    const user = !!localStorage.getItem('loggedUser');
    if (user) { this.loggedStateService.loggedState.next(true); }
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.loggedStateService.loggedState.next(false);
    this.routeLogin.navigate(['login']);
  }

}

