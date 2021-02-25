import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReminderService} from "../../../../services/reminder.service";
import {ToasterService} from "../../../../services/toaster.service";

@Component({
  selector: 'app-reminder-editor',
  template: `
		<form [formGroup]="remindItem">
			<mat-form-field floatLabel="never" class="w100">
				<mat-label>Choose a date</mat-label>
				<input matInput [matDatepicker]="picker" formControlName="selectDate">
				<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
				<mat-datepicker touchUi #picker startView="year"></mat-datepicker>
			</mat-form-field>

			<mat-form-field floatLabel="never" class="w100">
				<mat-label >Title</mat-label>
				<input matInput formControlName="title">
			</mat-form-field>

			<mat-form-field floatLabel="never" class="w100">
				<mat-label >Description</mat-label>
				<textarea matInput formControlName="description"></textarea>
			</mat-form-field>

			<div fxLayout.gt-sm='row' fxLayout.xs="column" fxLayoutGap="30px" fxLayoutAlign="flex-start center">
				<mat-form-field>
					<mat-label>Select group</mat-label>
					<mat-select formControlName="group">
						<mat-option *ngFor="let item of groups; index as i" [value]="item"> {{ item }} </mat-option>
					</mat-select>
				</mat-form-field>

				<mat-form-field floatLabel="never"> 
					<mat-label>Create group</mat-label>
					<input matInput formControlName="newGroup">
				</mat-form-field>
        
				<div>
					<button mat-raised-button (click)="addNewGroup()" >Add</button>
				</div>
			</div>
      
			<div fxLayout="row" fxLayoutGap="10px">
				<button mat-raised-button (click)="onNoClick()"> Cancel </button>
				<button mat-raised-button color="accent" [disabled]="!remindItem.valid" [mat-dialog-close]="remindItem.value"> Save </button>
			</div> 
		</form>
  `,
  styleUrls: ['./remined-editor.component.scss']
})
export class RemindEditorComponent implements OnInit {
  public remindItem: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<RemindEditorComponent>,
      private formBuilder: FormBuilder,
      private reminderService: ReminderService,
      private toastService: ToasterService,
      @Inject(MAT_DIALOG_DATA) public groups) { }

  createForm() {
    this.remindItem = this.formBuilder.group(
        {
          selectDate: ['', [Validators.required]],
          title: ['', [Validators.required]],
          group: ['', Validators.required],
          newGroup: [],
          description: []
        }
    );
    this.remindItem.controls['group'].setValue(this.groups[0], { onlySelf: true });
  };


  addNewGroup() {
    let uniqueGroup =  this.remindItem.controls['newGroup'].value && !this.groups.includes( this.remindItem.controls['newGroup'].value );
    if ( uniqueGroup ) {
      this.groups.push(this.remindItem.controls['newGroup'].value);
      this.reminderService.updateGroupReminders(this.groups);
      this.toastService.showToast('groupAddSuccess', 'Success');
    } else {
      this.toastService.showToast('groupAlreadyExist', 'warning');
    }

  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.createForm();
  }

}
