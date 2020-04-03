
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Constants} from "../constants.list";
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable()
export class LoginService {
  _baseUrl: string;

  constructor(private httpClient: HttpClient, private constantList: Constants) {
  }

  loginUser(user) {
    //TODO: test user for this API
    user = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };

    this._baseUrl = this.constantList.Project.baseUrl;
    return this.httpClient.post(this._baseUrl + 'login', user, httpOptions);

  }

  getCurrentUser(userID) {
    // this._baseUrl = this.constantList.Project.baseUrl;
    // return this.httpClient.get(this._baseUrl + 'users' + '/' +  userID)
    //  .map(currUser => currUser['data']);
  }

  checkLogin() {
    return sessionStorage.getItem('loggedUser') !== null;
  }

}

