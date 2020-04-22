import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-accept-modal',
  template: `
		<h2 mat-dialog-title class="text_center"> You really want to delete note: </h2>
		<div mat-dialog-content class="text_center">
			{{data.title}}
		</div>
		<div mat-dialog-actions>
      <div class="text_center w100">
				<button mat-raised-button (click)="onNoClick()">No</button>
				<button mat-raised-button color="warn" [mat-dialog-close]="true">Ok</button>
      </div>

		</div>
  `,
  styleUrls: ['./accept-modal.component.scss']
})
export class AcceptModalComponent {

  constructor(
      public dialogRef: MatDialogRef<AcceptModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



}
