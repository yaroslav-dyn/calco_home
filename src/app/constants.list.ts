import { Injectable } from '@angular/core';

@Injectable()
export class Constants  {

   Project: { name: string; baseUrl?: string } = {
    name: 'CalcoHome',
    baseUrl: ''
  }


  messages: {[name: string]: string} = {
    'emailCantBeBlank': 'Email field can\'t be blank',
    'wrongEmailPattern': 'The email id doesn\'t seem right',
    'passwordLengthError': 'Password needs to be more than 8 characters',
    'passwordsDontMatch': 'Passwords don\'t match',
    'haveBeenRegister': 'You have been registered on',
    'haveProblemWithApi': 'Oops! Maybe we have problem with API',
    'haveNotAccount': 'I don\'t have account',
    'login': 'Login',
    'signUp': 'Sign Up'
  };

  public getMessage(str) {
    return this.messages[str];
  }

}
