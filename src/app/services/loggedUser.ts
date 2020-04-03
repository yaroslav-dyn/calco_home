import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoggedState {

  public loggedState: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {}
}
