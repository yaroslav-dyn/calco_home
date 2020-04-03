import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {Constants} from "./constants.list";

@Component({
  selector: 'app-root',
  template: `
  <!-- Start -->
   <div class="app_menu__container h100" [class.example-is-mobile]="mobileQuery.matches" >
      <mat-toolbar color="primary" class="app-toolbar">
        <button class="app_menu__btn" mat-icon-button (click)="snav.toggle()">
          <mat-icon color="accent">menu</mat-icon>
        </button>
        <h1 class="app_menu__logo app_nav__link">
          <a class="app_nav__link" routerLink="/" >{{constantList.Project.name}}</a>
        </h1>
      </mat-toolbar>
      <mat-sidenav-container class="app_sidenav__container h100" [style.marginTop.px]="mobileQuery.matches ? 56 : 0">
        <mat-sidenav #snav [mode]="mobileQuery.matches ? 'over' : 'side'" [fixedInViewport]="mobileQuery.matches" fixedTopGap="56">
          <mat-nav-list>
            <a mat-list-item class="app_nav__link" routerLink="." *ngFor="let nav of fillerNav">{{nav}}</a>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <div class="app_container">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  <!-- End -->
   `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);



  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private constantList: Constants) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
