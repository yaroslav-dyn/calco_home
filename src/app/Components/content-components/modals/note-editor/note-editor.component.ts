import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import NewNote = AppTypes.NewNote;

@Component({
  selector: 'app-note-editor',
  template: `
		<div mat-dialog-content class="text_center">
			<form name="note">
        <mat-form-field class="w100">
          <mat-label ></mat-label>
          <input matInput [value]="entireData.title" name="title" (change)="formHasChanged($event, 'title')">
        </mat-form-field>
        
        <mat-form-field class="w100">
          <mat-label></mat-label>
          <textarea  rows="3" matInput name="text" [value]="entireData.text" (change)="formHasChanged($event, 'text')"></textarea>
        </mat-form-field>
        
      </form>
		</div>
		<div mat-dialog-actions>
			<div class="text_center w100">
				<button mat-raised-button (click)="onNoClick()">Cancel</button>
				<button mat-raised-button color="accent" [mat-dialog-close]="entireData">Save</button>
			</div>
    </div>
  `,
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent {

  constructor(
      public dialogRef: MatDialogRef<NoteEditorComponent>,
      @Inject(MAT_DIALOG_DATA) public data) { }

      public entireData: NewNote = this.data;


  formHasChanged(text, type) {
    type === 'text' ? this.entireData.text = text.target.value : this.entireData.title = text.target.value;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}

