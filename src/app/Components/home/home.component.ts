import { Component, OnInit } from '@angular/core';
import {Constants} from "../../constants.list";

@Component({
  selector: 'app-home',
  template: `
    <!-- Start template -->
      <div class="plotter">
        <mat-grid-list cols="2" rowHeight="2:1">
          <mat-grid-tile class="plotter_item">
            <a routerLink="converter" class="text_center plotter_link">
              <div>
                <mat-icon aria-hidden="false"  class="plotter_icon">cached</mat-icon>
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
                <mat-icon aria-hidden="false"  class="plotter_icon">notes</mat-icon>
                <div>{{constantList.getMessage('notes')}}</div>
              </div>
            </a>
          </mat-grid-tile>
          
          <mat-grid-tile class="plotter_item">
						<a routerLink="reminder" class="text_center plotter_link">
							<div>
								<mat-icon aria-hidden="false" class="plotter_icon"> calendar_today </mat-icon>
								<div>{{constantList.getMessage('reminder')}}</div>
							</div>
						</a>
          </mat-grid-tile>
        </mat-grid-list>
      </div>
    <!-- End template -->
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor (private constantList: Constants) { }

  ngOnInit() {

  }

}
