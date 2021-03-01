import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-reminder-controls',
  template: `
    <mat-toolbar class="reminder_controls">
      <div fxLayout.gt-sm='row' fxLayout.xs="column" fxLayoutGap="30px" fxLayoutAlign="flex-start center">
        <mat-form-field>
          <mat-label>Filter by group {{groupReminder.value}}</mat-label>
          <mat-select (valueChange)="filterGroupChanged.emit($event)" [formControl]="groupReminder">
            <mat-option *ngFor="let item of eventGroups; index as i" [value]="item"> {{ item }} </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./reminder-controls.component.scss']
})

export class ReminderControlsComponent {
  @Input() eventGroups;
  @Output() filterGroupChanged = new EventEmitter();
  public groupReminder = new FormControl();
}
