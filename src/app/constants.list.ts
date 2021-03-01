import {Injectable} from '@angular/core';
import {MAT_NATIVE_DATE_FORMATS, MatDateFormats} from '@angular/material';

@Injectable()
export class Constants {
  Project: { name: string; baseUrl?: string } = {
    name: 'CalcoHome',
    baseUrl: ''
  };
  messages: { [name: string]: string } = {
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
    'timer': 'Timer',
    'timeIsOut': 'Time is out',
    'notes': 'Notes',
    'reminder': 'Reminder',
    'vocabulary': 'Vocabulary',
    'askForDelete': 'You really want to delete',
    'groupAddSuccess': 'Group was added successfully',
    'groupAlreadyExist': 'Group already exist',
    'userNotFound': 'User not found!',
    'cantFetchWord': 'Sorry API doesn\'t available now'
  };

  public getMessage(str) {
    return this.messages[str];
  }
}

export const TYPICAL_CALENDAR_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  }
};
