import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from "@angular/cdk/layout";
import { Constants } from "./constants.list";
import { LoggedState } from "./services/loggedUser";
import {LoginService} from "./services/login.service";

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
            <a class="app_nav__link" [routerLink]="'/'">{{ constantList.Project.name }}</a>
          </h1>
          <div class="app_menu__top-links">
            <a  class="app_nav__link" routerLink="login" routerLinkActive="active" *ngIf="!loggedUser">{{ constantList.getMessage('login') }}</a>
            <a  class="app_nav__link" routerLink="sign-up" routerLinkActive="active" *ngIf="!loggedUser">{{ constantList.getMessage('signUp') }}</a>
            <a  class="app_nav__link" (click)="logout()" *ngIf="loggedUser">
              <mat-icon aria-hidden="false" aria-label="home">power_settings_new</mat-icon>
            </a>
          </div>
   
      </mat-toolbar>
      <mat-sidenav-container class="app_sidenav__container h100" [style.marginTop.px]="mobileQuery.matches ? 56 : 0">
        <mat-sidenav #snav [mode]="mobileQuery.matches ? 'over' : 'side'" [fixedInViewport]="mobileQuery.matches" fixedTopGap="56">
          <mat-nav-list>
            <div *ngFor="let nav of fillerNav">
              <a mat-list-item class="app_nav__link" [routerLink]="nav.path" 
                 *ngIf="(nav.requiredLogin && loggedUser) || (!nav.requiredLogin && !loggedUser)">
                <mat-icon aria-hidden="false" *ngIf="nav.icon">{{nav.icon}}</mat-icon>
                {{nav.label}}
              </a>
            </div>
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
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;
  loggedUser: boolean;
  fillerNav = [
    {
      label: 'Login',
      path: 'login',
      requiredLogin: false,
      icon: null
    },
    {
      label: 'Sign Up',
      path: 'sign-up',
      requiredLogin:  false,
      icon: null

    },
    {
      label: 'Converter',
      path: 'converter',
      requiredLogin:  true,
      icon: 'cashed'
    }
  ];

  logout() {
    this.loginService.logout();
  }

  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private constantList: Constants,
    private loginService: LoginService,
    private loggedService: LoggedState) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.loginService.checkLogin();
    this.loggedService.loggedState.subscribe((loggedUser) => this.loggedUser = loggedUser);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
