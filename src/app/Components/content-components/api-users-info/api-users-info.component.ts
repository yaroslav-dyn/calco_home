import { Component, OnInit } from '@angular/core';
import {Constants} from '../../../constants.list';

@Component({
  selector: 'app-api-users-info',
  template: `
    <div class="teal darken-1 white-text">
    <div>
      <div class="row valign-wrapper">
        <div class="col s10">
          {{constantList.Project.name}} uses <a href="https://reqres.in" target="_blank">simple JSON test API</a> for registration and login functionality. <br>
          Your Email and password can be simple it isn't connect to DB
        </div>
        <div class="col s2 right-align">
          <i class="material-icons attention-icon">new_releases</i>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./api-users-info.component.scss']
})
export class ApiUsersInfoComponent implements OnInit {

  constructor(private constantList: Constants) { }

  ngOnInit() {

  }

}
