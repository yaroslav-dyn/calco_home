import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../../constants.list";

@Component({
  selector: 'app-accept-modal',
  template: `
		<h2 mat-dialog-title class="text_center"> {{constants.getMessage('askForDelete')}} {{data.type}}: </h2>
		<div mat-dialog-content class="text_center">
			{{data.item.title}}
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
      @Inject(MAT_DIALOG_DATA) public data,
      private constants: Constants) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



}
