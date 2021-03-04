import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageMap} from '@ngx-pwa/local-storage';
import {ToasterService} from '../../services/toaster.service';
import {FileUploaderComponent} from '../content-components/file-uploader';
import CurrentUser = AppTypes.CurrentUser;

@Component({
  selector: 'app-profile',
  providers: [FileUploaderComponent],
  template: `
    <div class="half-screen">
      <form [formGroup]="profileForm" (ngSubmit)="saveProfile()">
        <app-file-uploader formControlName="avatar" [showAvatar]="true" [convertedImg]="getConvertedImg"></app-file-uploader>
        <mat-form-field  class="w100">
          <mat-label>User name</mat-label>
          <input matInput formControlName="userName">
        </mat-form-field>
        <mat-form-field class="w100">
          <mat-label>Full name</mat-label>
          <input matInput formControlName="fullName">
        </mat-form-field>
        <mat-form-field class="w100">
          <mat-label>Age</mat-label>
          <input matInput="number" type="number" min="1" max="199" formControlName="age">
        </mat-form-field>
        <button mat-flat-button color="primary">Save</button>
      </form>
    </div>
  `,
  styles: []
})

export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public currentUser: CurrentUser | string;

  constructor(private formBuilder: FormBuilder, private storage: StorageMap, private toastService: ToasterService) {}

  createForm() {
    this.profileForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      fullName: [null],
      age: [null],
      avatar: [null]
    });
  }

  saveProfile() {
    const profileObj = this.profileForm.getRawValue();
    if (this.getConvertedImg) {
      Object.assign(profileObj, {avatar: this.getConvertedImg});
    }
    this.storage.set('currentUser', JSON.stringify(profileObj), {type: 'string'}).subscribe({
      next: () => {
        this.toastService.showToast('saveProfileSuccess', 'success');
      }, error: (error) => {
        this.toastService.showToast('saveProfileError ', 'error');
      }
    });
  }

  get getConvertedImg() {
    return this.profileForm.get('avatar').value;
  }

  ngOnInit() {
    this.createForm();
    this.storage.get('currentUser').subscribe((res: CurrentUser) => {
      // @ts-ignore
      const parsedObj = JSON.parse(res);
      if (res) {
        this.profileForm.setValue(parsedObj);
      }
    }, error => {
      this.toastService.showToast('dataCantBeGet', 'error');
    });
  }

}//
