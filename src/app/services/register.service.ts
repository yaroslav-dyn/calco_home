
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Constants} from "../constants.list";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root',
})

export class RegisterService {
  _baseUrl: string;

  constructor(private httpClient: HttpClient, private constantList: Constants) {
  }


  registerUser(user) {
    this._baseUrl = this.constantList.Project.baseUrl;
    return this.httpClient.post(this._baseUrl + 'register', user, httpOptions);

  }
}




