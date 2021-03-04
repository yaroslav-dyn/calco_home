import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Units} from '../../services/units-service';

@Component({
  selector: 'app-converter',
  template: `
    <!--  Start template  -->
    <mat-tab-group class="half-screen">
      <mat-tab>
        <ng-template mat-tab-label>
          <mat-icon>speed</mat-icon>
          Speed
        </ng-template>
        <form [formGroup]="converterGroupSpeed" class="converter_form" (input)="someChange($event)">
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
          <mat-icon>monitor_weight</mat-icon>
          weight
        </ng-template>
        <form [formGroup]="converterGroupWeight" class="converter_form" (input)="someChange($event)">
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
      <mat-tab label="Length">
        <ng-template mat-tab-label>
          <mat-icon>square_foot</mat-icon>
          Length
        </ng-template>
        <form [formGroup]="converterGroupLength" class="converter_form" (input)="someChange($event)">
          <mat-form-field class="w100">
            <mat-label>foot</mat-label>
            <input type="number" matInput placeholder="foot" formControlName="foot"/>
          </mat-form-field>
          <br>
          <mat-form-field class="w100">
            <mat-label>inches</mat-label>
            <input type="number" matInput placeholder="inches" formControlName="inches"/>
          </mat-form-field>
          <mat-form-field class="w100">
            <mat-label>centimeters</mat-label>
            <input type="number" matInput placeholder="centimeters" formControlName="centimeters"/>
          </mat-form-field>
        </form>
      </mat-tab>
    </mat-tab-group>
    <!--  end template  -->
  `,
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  public converterGroupSpeed: FormGroup;
  public converterGroupWeight: FormGroup;
  public converterGroupLength: FormGroup;

  constructor(private formBuilder: FormBuilder, public units: Units) {
  }

  createForm() {
    this.converterGroupSpeed = this.formBuilder.group({
      kilometers: this.units.unitsKm.kilometers,
      miles: this.units.unitsKm.miles,
      mps: this.units.unitsKm.mps
    });

    this.converterGroupWeight = this.formBuilder.group({
      kilograms: this.units.unitsKg.kilograms,
      pounds: this.units.unitsKg.pounds,
      grams: this.units.unitsKg.grams
    });

    this.converterGroupLength = this.formBuilder.group({
      foot: this.units.unitsFoot.foot,
      inches: this.units.unitsFoot.inches,
      centimeters: this.units.unitsFoot.centimeters,
    });
  }

  someChange(e) {
    this.unitCalculate(e.target.getAttribute('formcontrolname'), e.target.value);
  }

  calculate(key, value, units) {
    return units[key] * value;
  }

  unitCalculate(unit, val) {
    switch (unit) {
      case 'kilometers':
        this.patchFormValues('converterGroupSpeed', 'miles', 'mps', val, this.units.unitsKm);
        break;
      case 'miles':
        this.patchFormValues('converterGroupSpeed', 'kilometers', 'mps', val, this.units.unitsMiles);
        break;
      case 'mps':
        this.patchFormValues('converterGroupSpeed', 'kilometers', 'miles', val, this.units.unitsMps);
        break;
      case 'kilograms':
        this.patchFormValues('converterGroupWeight', 'grams', 'pounds', val, this.units.unitsKg);
        break;
      case 'pounds':
        this.patchFormValues('converterGroupWeight', 'kilograms', 'grams', val, this.units.unitslb);
        break;
      case 'grams':
        this.patchFormValues('converterGroupWeight', 'kilograms', 'pounds', val, this.units.unitsG);
        break;
      case 'foot':
        this.patchFormValues('converterGroupLength', 'inches', 'centimeters', val, this.units.unitsFoot);
        break;
      case 'inches':
        this.patchFormValues('converterGroupLength', 'foot', 'centimeters', val, this.units.unitsInches);
        break;
      case 'centimeters':
        this.patchFormValues('converterGroupLength', 'foot', 'inches', val, this.units.unitsCm);
        break;
    }
  }

  patchFormValues(form, second, end, val, units) {
    this[form].patchValue({
      [second]: this.calculate(second, val, units),
      [end]: this.calculate(end, val, units),
    });
  }

  ngOnInit() {
    this.createForm();
  }
}//
