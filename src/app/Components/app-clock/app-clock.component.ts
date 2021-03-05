import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `
   <div class="app_clock__wrapper">
     <div class="app_clock">{{currentDate}}</div>
   </div>
  `,
  styleUrls: ['./app-clock.component.scss']
})
export class AppClockComponent implements OnInit, OnDestroy {

  public currentDate: string;
  public currentInterval: number;

  constructor() { }

   setCurrentTime() {
    const dd = new Date();
     this.currentDate = `${dd.getHours()} : ${dd.getMinutes()}`;
    return this.currentDate;
  }

  ngOnInit() {
    this.setCurrentTime();
   this.currentInterval =  setInterval(() => {
      this.setCurrentTime();
    }, 30000);
  }

  ngOnDestroy() {
    window.clearInterval(this.currentInterval);
  }

}//
