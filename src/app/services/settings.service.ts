import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SettingsService {

public myData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {}
}
