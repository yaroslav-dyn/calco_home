import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Units {
  // Speed
  public unitsKm: {[name: string]: number} = {
    kilometers: 1,
    miles: 0.621371,
    mps: 1000
  };
  public unitsMiles: {[name: string]: number} = {
    kilometers: 1.60934,
    miles: 1,
    mps: 1609.34
  };

  public unitsMps: {[name: string]: number} = {
    mps: 1,
    kilometers: 0.001,
    miles: 0.000621371
  };

  // weight
  public unitsKg: { [name: string]: number } = {
    kilograms: 1,
    pounds: 2.2046,
    grams: 1000
  };

  public unitslb: { [name: string]: number } = {
    kilograms: 0.4535923,
    pounds: 1,
    grams: 453.5923
  };

  public unitsG: { [name: string]: number} = {
    kilograms: 0.001,
    pounds: 0.0022046,
    grams: 1
  };

  // Length
  public unitsFoot: {[name: string]: number} = {
    foot: 1,
    inches: 12,
    centimeters: 30.48
  };
  public unitsInches: {[name: string]: number} = {
    foot: 0.08333333333,
    inches: 1,
    centimeters: 2.54
  };

  public unitsCm: {[name: string]: number} = {
    foot: 0.0328084,
    inches: 0.4,
    centimeters: 1
  };


}//
