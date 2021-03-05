import {Component, OnDestroy, OnInit} from '@angular/core';
import {Constants} from '../../constants.list';
import {Router} from '@angular/router';
import {AppClockComponent} from '../app-clock/app-clock.component';

@Component({
  selector: 'app-home',
  providers: [AppClockComponent],
  template: `
    <div>
      <!-- Start template -->
      <div class="plotter" *ngIf="!showScreenSaver">
        <mat-grid-list cols="2" rowHeight="2:1">
          <mat-grid-tile class="plotter_item">
            <a routerLink="converter" class="text_center plotter_link">
              <div>
                <mat-icon aria-hidden="false" class="plotter_icon">cached</mat-icon>
                <div>{{constantList.getMessage('converter')}}</div>
              </div>
            </a>
          </mat-grid-tile>
          <mat-grid-tile class="plotter_item">
            <a routerLink="timer" class="text_center plotter_link">
              <div>
                <mat-icon aria-hidden="false" class="plotter_icon">timer</mat-icon>
                <div>{{constantList.getMessage('timer')}}</div>
              </div>
            </a>
          </mat-grid-tile>
          <mat-grid-tile class="plotter_item">
            <a routerLink="notes" class="text_center plotter_link">
              <div>
                <mat-icon aria-hidden="false" class="plotter_icon">notes</mat-icon>
                <div>{{constantList.getMessage('notes')}}</div>
              </div>
            </a>
          </mat-grid-tile>
          <mat-grid-tile class="plotter_item">
            <a routerLink="reminder" class="text_center plotter_link">
              <div>
                <mat-icon aria-hidden="false" class="plotter_icon"> calendar_today</mat-icon>
                <div>{{constantList.getMessage('reminder')}}</div>
              </div>
            </a>
          </mat-grid-tile>
          <mat-grid-tile class="plotter_item">
            <a routerLink="vocabulary" class="text_center plotter_link">
              <div>
                <mat-icon aria-hidden="false" class="plotter_icon"> calendar_today</mat-icon>
                <div>{{constantList.getMessage('vocabulary')}}</div>
              </div>
            </a>
          </mat-grid-tile>
          <mat-grid-tile class="plotter_item">
            <a routerLink="qr-generator" class="text_center plotter_link">
              <div>
                <mat-icon aria-hidden="false" class="plotter_icon"> qr_code</mat-icon>
                <div>{{constantList.getMessage('qr_code')}}</div>
              </div>
            </a>
          </mat-grid-tile>
        </mat-grid-list>
      </div>
      <!-- End template -->
      <app-clock (click)="clearClock()" *ngIf="showScreenSaver"></app-clock>
    </div>

  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private overTime: number;
  public showScreenSaver = false;
  constructor(public constantList: Constants, private router: Router) {
  }

  setClock() {
   this.overTime =  setTimeout(() => {
     this.showScreenSaver = true;
    }, 60000);
  }

  clearClock() {
    window.clearTimeout( this.overTime );
    this.showScreenSaver = false;
    this.setClock();
  }

  ngOnInit() {
    this.setClock();
    document.body.addEventListener('click', ()=> {

      this.clearClock();
    })

  }

}
