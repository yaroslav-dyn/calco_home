import { Component, OnInit } from '@angular/core';
import {Constants} from '../../../constants.list';

@Component({
  selector: 'app-post-registration',
  template: `
  <!-- Start template    -->

  <div fxLayout="column" fxLayoutAlign="center center" class="h100">
    <div>
      <h2 class="main_heading">Thank you for registration on
        <span class="brand_name">
          <a color="primary"  routerLink="/">{{constantList.Project.name}}</a>
        </span>
      </h2>
      <div class="text_center">
        <h3>You can login now</h3>
        <br>
        <a mat-raised-button class="w100" color="primary" routerLink="/login">Login</a>
        <a type="button" routerLink="/">Go to Home page</a>
      </div>
    </div>
  </div>
  <!-- End template   -->
  `,
  styleUrls: ['./post-registration.component.scss']
})
export class PostRegistrationComponent implements OnInit {

  constructor(public constantList: Constants) { }

  ngOnInit() {
  }

}
