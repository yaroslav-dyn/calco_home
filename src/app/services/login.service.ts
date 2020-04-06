
import {Injectable} from '@angular/core';
import {Constants} from "../constants.list";
import { StorageMap } from '@ngx-pwa/local-storage';



@Injectable()
export class LoginService {
  _baseUrl: string;

  constructor(private constantList: Constants, private storage: StorageMap) {

  }

   loginUser(user) {

     this.storage.get('loggedUser').subscribe((data) => {
        console.log('data from store', data);
     });

  }

  checkLogin() {
    this.storage.get('loggedUser').subscribe((user) => {
      console.log(user);
      return user !== null
    });
  }

}

