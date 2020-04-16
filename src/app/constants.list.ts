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
    'passwordCantBeBlank': 'Password field can\'t be blank',
    'passwordLengthError': 'Password needs to be more than 6 characters',
    'passwordsDontMatch': 'Passwords don\'t match',
    'haveBeenRegister': 'You have been registered on',
    'haveProblemWithApi': 'Oops! Maybe we have problem with API',
    'iHaveAccount': 'I have an account',
    'haveNotAccount': 'I don\'t have an account',
    'login': 'Login',
    'signUp': 'Sign Up',
    'logout': 'Logout',
    'termsConditions': 'You must accept terms and conditions',
    'incorrectLoginData': 'Your account or password is incorrect',
    'converter': 'Converter',
    'timer': 'Timer'
  };

  public getMessage(str) {
    return this.messages[str];
  }

}
