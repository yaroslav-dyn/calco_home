import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-reminder-card',
  template: `
    <div class="reminder">
      <mat-accordion *ngIf="eventItem">
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{  eventItem.title  }}
            </mat-panel-title>
            <mat-panel-description>
              <div class="w100" fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="10px">
                <div> {{ eventItem.group }} </div>
                <div> {{ eventItem.selectDate | date:"dd/MM/yy" }} </div>
                <mat-icon class="note_block__icon" aria-hidden="false" aria-label="edit" color="warn"
                  matTooltip="Edit this event"
                  matTooltipPosition="right"
                  (click)="eventEdit.emit()">edit
                </mat-icon>

                <mat-icon class="note_block__icon" aria-hidden="false" aria-label="delete" color="warn"
                  matTooltip="Delete this event"
                  matTooltipPosition="right"
                  (click)="delEvent.emit()">delete
                </mat-icon>
              </div>
            </mat-panel-description>
          </mat-expansion-panel-header>
          <div class="reminder_content">
            {{ eventItem.description }}
          </div>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styleUrls: ['./reminder-card.component.scss']
})

export class ReminderCardComponent {
  @Input() eventItem;
  @Input() index: number;
  @Output() delEvent = new EventEmitter();
  @Output() eventEdit = new EventEmitter();

  constructor( public dialog: MatDialog ) {}
}
