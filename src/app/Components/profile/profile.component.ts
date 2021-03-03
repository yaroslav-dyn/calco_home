import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageMap} from '@ngx-pwa/local-storage';
import {ToasterService} from '../../services/toaster.service';
import {FileUploaderComponent} from '../content-components/file-uploader';

export interface CurrentUser {
  avatar?: string;
  userName: string;
  fullName?: string;
  age?: string;
}

export interface FileObject {
  imageBlob: string;
  imageData: Blob;
  name: string;
  converted?: string;
}


@Component({
  selector: 'app-profile',
  providers: [FileUploaderComponent],
  template: `
      <div class="half-screen">
          <form [formGroup]="profileForm" (ngSubmit)="saveProfile()">

            <app-file-uploader formControlName="image" [showAvatar]="true" (fileUploaded)="setAvatar($event)"></app-file-uploader>

            <mat-form-field  floatLabel="never" class="w100">
              <mat-label>User name</mat-label>
              <input matInput formControlName="userName">
            </mat-form-field>
            <mat-form-field  floatLabel="never" class="w100">
              <mat-label>Full name</mat-label>
              <input matInput formControlName="fullName">
            </mat-form-field>
            <mat-form-field  floatLabel="never" class="w100">
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
  public uploadedAvatar: FileObject = {
    imageBlob: null,
    imageData: null,
    name: null,
    converted: null
  };

  constructor(private formBuilder: FormBuilder, private storage: StorageMap,  private toastService: ToasterService) { }

  createForm() {
    this.profileForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      fullName: [null],
      age: [null],
      image: [null]
    });
  }
  saveProfile() {
    const profileObj = this.profileForm.getRawValue();

    console.log(
      'fdf',
      this.profileForm.getRawValue()
    );

    if (this.uploadedAvatar.converted) {
      Object.assign(profileObj, {avatar: this.uploadedAvatar.converted} );
    }

    this.storage.set( 'currentUser',  JSON.stringify(profileObj), {type: 'string'}).subscribe({
      next: () => {
        this.toastService.showToast('saveProfileSuccess', 'success');
      }, error: (error) => { this.toastService.showToast('saveProfileError ', 'error'); }
    });
  }
  setAvatar(ava) {
    this.uploadedAvatar = ava;
    this.profileForm.patchValue({
      avatar: ava.converted || null
    });
  }
  ngOnInit() {
    this.createForm();
    this.storage.get('currentUser').subscribe( (res: CurrentUser) => {
      // @ts-ignore
      const parsedObj = JSON.parse(res);
      if (res) {
        this.profileForm.setValue(parsedObj);
        this.uploadedAvatar.converted = parsedObj.avatar;
      }
    }, error => {});
  }

}//
