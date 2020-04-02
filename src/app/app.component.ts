import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app_container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
