import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

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
        <mat-tab label="Second">
          <ng-template mat-tab-label>
            <mat-icon>monitor_weight</mat-icon> weight
          </ng-template>
          
          <form [formGroup]="converterGroupWeight" class="converter_form">
            <mat-form-field class="w100">
              <mat-label>kilograms</mat-label>
              <input type="number" matInput placeholder="kilograms" formControlName="kilograms"/>
            </mat-form-field>
            <br>
            <mat-form-field class="w100">
              <mat-label>pounds</mat-label>
              <input type="number" matInput placeholder="pounds" formControlName="pounds"/>
            </mat-form-field>
            <br>
            <mat-form-field class="w100">
              <mat-label>grams</mat-label>
              <input type="number" matInput placeholder="grams" formControlName="grams"/>
            </mat-form-field>
          </form>
        
        </mat-tab>
        <mat-tab label="Third"> Feature </mat-tab>
      </mat-tab-group>
    <!--  end template  -->
  `,
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  public converterGroup: FormGroup;

  public unitsKm: {[name: string]: number} = {
    kilometers: 1,
    miles: 0.621371,
    mps: 1000
  }
  public unitsMiles: {[name: string]: number} = {
    kilometers: 1.60934,
    miles: 1,
    mps: 1609.34
  }

  public unitsMps: {[name: string]: number} = {
    mps: 1,
    kilometers: 0.001,
    miles: 0.000621371
  }


  public converterGroupWeight: FormGroup;

  public unitsKg: { [name: string]: number } = {
    kilograms: 1,
    pounds: 2.2046,
    grams: 1000
  }

  public unitslb: { [name: string]: number } = {
    kilograms: 0.4535923,
    pounds: 1,
    grams: 453.5923
  }

  public unitsG: {[name: string]: number} = {
    kilograms: 0.001,
   pounds: 0.0022046,
    grams: 1
  }

  constructor(private formBuilder: FormBuilder) { }

  createForm() {

    this.converterGroup = this.formBuilder.group({
      kilometers: this.unitsKm.kilometers,
      miles: this.unitsKm.miles,
      mps: this.unitsKm.mps
    })

    this.converterGroupWeight = this.formBuilder.group({
      kilograms: this.unitsKg.kilograms,
      pounds: this.unitsKg.pounds,
      grams: this.unitsKg.grams
    })

  }


  calculate(key, value, units) {
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


    this.converterGroupWeight.get('kilograms').valueChanges.subscribe(value  => {
      this.converterGroupWeight.patchValue({
        pounds: this.calculate('pounds', value, this.unitsKg),
        grams:   this.calculate('grams', value, this.unitsKg),
      }, {emitEvent: false});
    });
    this.converterGroupWeight.get('pounds').valueChanges.subscribe(value  => {
      this.converterGroupWeight.patchValue({
        kilograms: this.calculate('kilograms', value, this.unitslb),
        grams:   this.calculate('grams', value, this.unitslb),
      }, {emitEvent: false});
    });
    this.converterGroupWeight.get('grams').valueChanges.subscribe(value  => {
      this.converterGroupWeight.patchValue({
        kilograms: this.calculate('kilograms', value, this.unitsG),
        pounds:   this.calculate('pounds', value, this.unitsG),
      }, {emitEvent: false});
    });


  }//


}
