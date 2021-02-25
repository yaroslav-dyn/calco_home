import { Component, OnInit } from '@angular/core';
import NewEvent = AppTypes.NewEvent;
import {MatDialog} from "@angular/material/dialog";
import {RemindEditorComponent} from "../content-components/modals/remined-editor/remind-editor.component";
import {ReminderService} from "../../services/reminder.service";
import {AcceptModalComponent} from "../content-components/modals/accept-modal/accept-modal.component";

@Component({
  selector: 'app-reminder',
  template: `
   <div class="reminders half-screen">

		 <app-reminder-controls
				 [eventGroups]="groups"
         (filterGroupChanged)="filterChanged($event)"
     >
  
     </app-reminder-controls>

		 <app-reminder-card *ngFor="let event of (events | matchString:groupFilter); index as i"
        [eventItem]="event"
        [index]="i"
        (delEvent)="openDeleteDialog(i, event, 'reminder')">
     </app-reminder-card>
     
		 <div class="reminders_actions w100">
			 <button mat-fab color="action-green" (click)="addRemind()">
				 <mat-icon aria-hidden="false" aria-label="add" text="text-inverted"> add </mat-icon>
			 </button>
		 </div>
     
   </div>
  `,
  styleUrls: ['./reminder.component.scss']
})

export class ReminderComponent implements OnInit {

  public groups: string[] = ['all'];
  public groupFilter: string = 'all'


  public events: NewEvent[] = [];

  constructor(
      public dialog: MatDialog,
      private reminderService: ReminderService
  ) { }

  addRemind () {
    const dialogRef =  this.dialog.open(RemindEditorComponent, {
      width: '50vw',
      height: '50vh',
      data: this.groups,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.saveItem(result);
      }

    });
  };

  saveItem (item) {
    this.events.push(item);
    this.reminderService.updateReminders(this.events);
  };

  openDeleteDialog(i, inst, type): void {
    const dialogRef = this.dialog.open(AcceptModalComponent, {
      width: 'auto',
      data: {item: inst, type: type}
    });
    dialogRef.afterClosed().subscribe(result =>  {
      if(result) this.delNote(i)
    });
  }

  delNote(i): void {
    this.events =  this.events.filter((e, j) => i !== j);
    this.reminderService.updateReminders(this.events);
  }

  filterChanged(ev) {
    this.groupFilter = ev;
  }

  getAllReminders() {
    this.reminderService.getReminders().subscribe({
      next: (data) => data ? this.events = JSON.parse(data) : [],
      error: (error) => console.log('error user', error)
    })
  };

  getAllGroups() {
    this.reminderService.getRemindersGroup().subscribe({
      next: (data) => data ? this.groups = [...JSON.parse(data)]  : ['all'],
      error: (error) => console.log('error user', error)
    })
  }

  ngOnInit() {
    this.getAllReminders();
    this.getAllGroups();
  };

}
