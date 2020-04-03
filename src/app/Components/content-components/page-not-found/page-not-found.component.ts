import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <!-- Start template  -->
  <div fxLayout="column" fxLayoutAlign="center center" class="h100">
    <div fxFlex="1">
      <h2>Sorry but this page was not found!</h2>
      <a routerLink="/">Go to Home page</a>
    </div>
  </div>
  <!-- End template  -->
  `,
  styles: [`
    .service_paragraph {
      font-size: 16px;
      color: #444;
      }
    `]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
