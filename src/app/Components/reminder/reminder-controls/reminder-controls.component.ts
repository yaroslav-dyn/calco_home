import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-reminder-controls',
  template: `
		<mat-toolbar>
			<div fxLayout.gt-sm='row' fxLayout.xs="column" fxLayoutGap="30px" fxLayoutAlign="flex-start center">
				<mat-form-field>
					<mat-label>Filter by group</mat-label>
					<mat-select >
						<mat-option *ngFor="let item of eventGroups; index as i" [value]="item"> {{ item }} </mat-option>
					</mat-select>
				</mat-form-field>
      </div>
      
		</mat-toolbar>
  `,
  styleUrls: ['./reminder-controls.component.scss']
})
export class ReminderControlsComponent implements OnInit {

  @Input() eventGroups

  constructor() { }

  ngOnInit() {
  }

}
