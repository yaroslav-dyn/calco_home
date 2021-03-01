import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Constants} from './constants.list';
import {LoggedState} from './services/loggedUser';
import {LoginService} from './services/login.service';
import {RegisterService} from './services/register.service';

@Component({
  selector: 'app-root',
  template: `
    <!-- Start -->
    <div class="app_menu__container h100" [class.example-is-mobile]="mobileQuery.matches">
      <mat-toolbar color="primary" class="app-toolbar">
        <button class="app_menu__btn" mat-icon-button (click)="snav.toggle()">
          <mat-icon *ngIf="!snav.opened" class="app_menu__trigger">menu</mat-icon>
          <mat-icon *ngIf="snav.opened" class="app_menu__trigger">close</mat-icon>
        </button>
        <h1 class="app_menu__logo app_nav__link" fxShow fxHide.lt-md="true">
          <a class="app_nav__link" [routerLink]="'/'">{{ constantList.Project.name }}</a>
        </h1>
        <div fxHide fxShow.lt-md class="app_menu__dashboard-link">
          <a class="dashboard-link" routerLink="/">
            <mat-icon class="dashboard-link__icon" aria-hidden="false" aria-label="menu">dashboard</mat-icon>
          </a>
        </div>
        <div class="app_menu__top-links" fxShow fxHide.lt-md="true">
          <a class="app_nav__link" routerLink="login" routerLinkActive="active"
             *ngIf="!loggedUser">{{ constantList.getMessage('login') }}</a>
          <a class="app_nav__link" routerLink="sign-up" routerLinkActive="active"
             *ngIf="!loggedUser">{{ constantList.getMessage('signUp') }}</a>
          <a mat-list-item *ngIf="loggedUser" routerLink="/">
            <mat-icon class="dashboard-link__icon" aria-hidden="false" aria-label="menu">dashboard</mat-icon>
          </a>
          <a class="app_nav__link" (click)="logout()" *ngIf="loggedUser">
            <mat-icon color="warn" aria-hidden="false" aria-label="home">power_settings_new</mat-icon>
          </a>
        </div>

      </mat-toolbar>
      <mat-sidenav-container class="app_sidenav__container h100" [style.marginTop.px]="mobileQuery.matches ? 56 : 0">
        <mat-sidenav #snav [mode]="mobileQuery.matches ? 'over' : 'side'" [fixedInViewport]="mobileQuery.matches"
                     fixedTopGap="56">
          <mat-nav-list>
            <div *ngFor="let nav of fillerNav">
              <a mat-list-item class="app_nav__link" [routerLink]="nav.path"
                 *ngIf="(nav.requiredLogin && loggedUser) || (!nav.requiredLogin && !loggedUser)">
                <mat-icon aria-hidden="false" *ngIf="nav.icon">{{nav.icon}}</mat-icon>
                {{nav.label}}
              </a>
            </div>
            <a mat-list-item (click)="logout()" *ngIf="loggedUser">
              <mat-icon aria-hidden="false" aria-label="home" color="warn">power_settings_new</mat-icon>
              {{constantList.getMessage('logout')}}
            </a>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content class="app_sidenav__container--inner">
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
export class AppComponent implements OnInit, OnDestroy {

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              public constantList: Constants,
              private loginService: LoginService,
              private loggedService: LoggedState,
              private registerService: RegisterService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  mobileQuery: MediaQueryList;
  loggedUser: boolean;
  fillerNav = [
    {
      label: 'Dashboard',
      path: '/',
      requiredLogin: true,
      icon: 'dashboard'
    },
    {
      label: 'Login',
      path: 'login',
      requiredLogin: false,
      icon: null
    },
    {
      label: 'Sign Up',
      path: 'sign-up',
      requiredLogin: false,
      icon: null

    },
    {
      label: 'Converter',
      path: 'converter',
      requiredLogin: true,
      icon: 'cached'
    },
    {
      label: 'Timer',
      path: 'timer',
      requiredLogin: true,
      icon: 'timer'
    },
    {
      label: 'Notes',
      path: 'notes',
      requiredLogin: true,
      icon: 'notes'
    },
    {
      label: 'Reminder',
      path: 'reminder',
      requiredLogin: true,
      icon: 'calendar_today'
    },
    {
      label: 'Vocabulary',
      path: 'vocabulary',
      requiredLogin: true,
      icon: 'bookmarks'
    }
  ];

  private _mobileQueryListener: () => void;


  logout() {
    this.loginService.logout();
  }

  ngOnInit(): void {

    this.registerService.registerUser({email: 'test@mail.com', password: '123qwe'}).then((res) => {
    }, Error => {
      console.log('error', Error.error);
    });

    this.loginService.checkLogin();
    this.loggedService.loggedState.subscribe((loggedUser) => this.loggedUser = loggedUser);
  }

  testTemple(e) {
    console.log(e);
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
