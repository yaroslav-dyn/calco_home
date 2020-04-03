import {Injectable} from '@angular/core';
import {Constants} from "../constants.list";



@Injectable()
export class ToasterService {

  Messages: any = this.constantList.messages;
  Const: any = this.constantList;
  constructor(private constantList: Constants) {}
  showToast(mes, type) {
    // this.Toaster.show(this.Messages[mes] , this.Const.project.toasterDelay, 'bb-toast ' + type);
  }

}
