import {Injectable} from '@angular/core';
import {Constants} from "../constants.list";
import {MatSnackBar} from "@angular/material/snack-bar";



@Injectable({
  providedIn: "root"
})
export class ToasterService {

  Messages: any = this.constantList.messages;
  Const: any = this.constantList;
  constructor(private constantList: Constants,
              private _snackBar: MatSnackBar) {}
  showToast(mes, type) {
    this._snackBar.open(this.Messages[mes] , type,  {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

}
