import {Component, OnInit, ViewChild} from '@angular/core';
import {CountdownComponent} from 'ngx-countdown';
import {ToasterService} from '../../services/toaster.service';

@Component({
  selector: 'app-timer',
  template: `
    <!-- Start template -->
    <div class="app_timer half-screen">
      <div>
        <mat-form-field>
          <mat-label>add hours</mat-label>
          <input type="number" min="0" matInput placeholder="hours" [(ngModel)]="hours" (ngModelChange)="setSeconds()"/>
        </mat-form-field>
        <mat-form-field>
          <mat-label>add minutes</mat-label>
          <input type="number" min="0" matInput placeholder="seconds" [(ngModel)]="minutes" (ngModelChange)="setSeconds()"/>
        </mat-form-field>
        <div>
          <mat-form-field>
            <mat-label>add seconds</mat-label>
            <input type="number" matInput min="0" placeholder="seconds" [(ngModel)]="seconds" (ngModelChange)="setSeconds()"/>
          </mat-form-field>
        </div>
      </div>
      <countdown [ngClass]="{'app_timer__remind': timeRemind }" class="app_timer__display" #cd1 [config]="timerConfig"
                 (event)="doneTimer($event)"></countdown>
      <div class="app_timer__controls">
        <button mat-raised-button (click)="cd1.pause()" class="app_timer__controls--btn">
          <mat-icon>pause</mat-icon>
        </button>
        <button *ngIf="timeStart" color="warn" mat-fab (click)="cd1.pause()" class="app_timer__controls--btn">
          <mat-icon>stop</mat-icon>
        </button>
        <button *ngIf="!timeStart" mat-fab color="primary" (click)="cd1.begin()" class="app_timer__controls--btn">
          <mat-icon>play_arrow</mat-icon>
        </button>
        <button mat-raised-button (click)="cd1.restart()" class="app_timer__controls--btn">
          <mat-icon>refresh</mat-icon>
        </button>
      </div>
    </div>
    <!-- End template -->
  `,
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @ViewChild('cd1', {static: false}) private countdown: CountdownComponent;

  public timeRemind = false;

  public seconds = 30;
  public minutes = 0;
  public timeStart = false;
  public hours = 0;

  timerConfig: any = {
    leftTime: 30,
    demand: true
  };


  constructor(private toast: ToasterService) {
  }

  setSeconds() {
    const sumMin = (this.hours * 3600) + (this.minutes * 60) + this.seconds;
    if (sumMin > 0) {
      this.timerConfig = {
        leftTime: sumMin,
        demand: true,
        notify: [3]
      };
    }
  }

  doneTimer(ev) {
    if (ev.action === 'start') {
      this.timeStart = true;
    }
    if (ev.action === 'stop' || ev.action === 'restart' || ev.action === 'pause') {
      this.timeStart = false;
    }
    if (ev.action === 'notify') {
      this.timeRemind = true;
    }
    if (ev.action === 'done') {
      this.toast.showToast('timeIsOut', 'info', 8000);
      this.playAudio();
      this.timeStart = false;
    }
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '../../assets/alarm.m4a';
    audio.load();
    audio.play();
  }

  ngOnInit() {
  }

}
