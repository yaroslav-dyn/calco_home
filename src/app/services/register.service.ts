import {Injectable} from '@angular/core';
import {Constants} from "../constants.list";
import { StorageMap } from '@ngx-pwa/local-storage';


@Injectable({
  providedIn: 'root',
})

export class RegisterService {

  constructor( private constantList: Constants,
               private storage: StorageMap) {
  }

  async registerUser(user) {
    this.storage.set( user.email.toString(), user.password.toString()).subscribe({
      next: () => {}, error: (error) => { console.log('error user', error)}
    });
  }
}




