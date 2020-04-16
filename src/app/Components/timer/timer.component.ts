import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  template: `      
  <!-- Start template -->
  <div>
    <countdown #cd1 [config]="{leftTime: 30}" ></countdown>
    <button (click)="cd1.pause()" class="btn btn-link btn-sm">pause</button>
    <button (click)="cd1.resume()" class="btn btn-link btn-sm">resume</button>
    <button (click)="cd1.stop()" class="btn btn-link btn-sm">stop</button>
    <button (click)="cd1.restart()" class="btn btn-link btn-sm">restart</button>

  </div>
  <!-- End template -->
  `,
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
