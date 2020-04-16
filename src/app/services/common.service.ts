import {Injectable} from "@angular/core";
import {Constants} from "../constants.list";

@Injectable({
  providedIn: "root"
})

export class CommonService  {

  constructor( private constantList: Constants) {}

  getError(el, formElement) {
    switch (el) {
      case 'email':
        if (formElement.get('email').hasError('required')) {
          return 'email required';
        } else if (formElement.get('email').hasError('pattern')) {
          return 'invalid email';
        } break;
      case 'pass':
        if (formElement.get('password').hasError('required')) {
          return this.constantList.messages.passwordCantBeBlank
        } else if (formElement.get('password').hasError('minlength')) {
          return this.constantList.messages.passwordLengthError
        } break;
      case 'repeatPassword':
        return this.constantList.messages.passwordsDontMatch
      case 'TermsConditions':
        return this.constantList.messages.passwordsDontMatch
      default:
        return '';
    }
  }

}
