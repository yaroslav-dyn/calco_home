import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TermsService {

    public termsState: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor() {}
}
