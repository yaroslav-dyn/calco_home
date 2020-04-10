import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {TermsModalComponent} from "./terms-modal.component";


@Component({
  selector: 'app-terms',
  template: ` <a  (click)="openDialog()">Terms and conditions</a>`,
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent  {

  constructor(private dialog: MatDialog) {}

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;




    this.dialog.open(TermsModalComponent, {
      width: '80vw',
      height: '80vh',
      disableClose: true
    });

  }


}




