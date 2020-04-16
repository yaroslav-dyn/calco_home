import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {fromArray} from "rxjs/internal/observable/fromArray";

@Component({
  selector: 'app-converter',
  template: `
    <!--  Start template  -->
      <mat-tab-group class="half-screen">
        <mat-tab>
          <ng-template mat-tab-label>
              <mat-icon>speed</mat-icon> Speed
          </ng-template>
          <form [formGroup]="converterGroup" class="converter_form">
            <mat-form-field class="w100">
              <mat-label>kilometers</mat-label>
              <input type="number" matInput placeholder="kilometers" formControlName="kilometers"/>
            </mat-form-field>
            <br>
            <mat-form-field class="w100">
              <mat-label>miles</mat-label>
              <input type="number" matInput placeholder="miles" formControlName="miles"/>
            </mat-form-field>
            <br>
            <mat-form-field class="w100">
              <mat-label>meters</mat-label>
              <input type="number" matInput placeholder="meter per second" formControlName="mps"/>
            </mat-form-field>
          </form>
        </mat-tab>
        <mat-tab label="Second"> Feature </mat-tab>
        <mat-tab label="Third"> Feature </mat-tab>
      </mat-tab-group>
    <!--  end template  -->
  `,
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  public converterGroup: FormGroup;
  public unitsKm: any = {
    kilometers: 1,
    miles: 0.621371,
    mps: 1000
  }
  public unitsMiles: any = {
    kilometers: 1.60934,
    miles: 1,
    mps: 1609.34
  }

  public unitsMps: any = {
    mps: 1,
    kilometers: 0.001,
    miles: 0.000621371
  }


  constructor(private formBuilder: FormBuilder) { }

  createForm() {
    this.converterGroup = this.formBuilder.group({
      kilometers: this.unitsKm.kilometers,
      miles: this.unitsKm.miles,
      mps: this.unitsKm.mps
    })
  }


  calculate(key, value, units) {
    console.log(key, value, units);
    return units[key] * value
  }

  ngOnInit() {
    this.createForm();

    this.converterGroup.get('kilometers').valueChanges.subscribe(value  => {
      this.converterGroup.patchValue({
        miles: this.calculate('miles', value, this.unitsKm),
        mps:   this.calculate('mps', value, this.unitsKm),
      }, {emitEvent: false});
    });
    this.converterGroup.get('miles').valueChanges.subscribe(value  => {
      this.converterGroup.patchValue({
        kilometers: this.calculate('kilometers', value, this.unitsMiles),
        mps:   this.calculate('mps', value, this.unitsMiles),
      }, {emitEvent: false});
    });
    this.converterGroup.get('mps').valueChanges.subscribe(value  => {
      this.converterGroup.patchValue({
        kilometers: this.calculate('kilometers', value, this.unitsMps),
        miles:   this.calculate('miles', value, this.unitsMps),
      }, {emitEvent: false});
    });

  }//


}
