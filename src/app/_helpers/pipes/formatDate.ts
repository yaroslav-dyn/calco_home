import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatDate'
})


export class FormatDate implements PipeTransform {
  private  defaultOption = { year: 'numeric', month: 'short', day: '2-digit' };

  transform(date, option) {

    let opt = option ? option : this.defaultOption;

    let configDate = new Intl.DateTimeFormat('en', opt);
    let inputDate = new Date(date);

    const [{ value: month },,{ value: day },,{ value: year }] = configDate.formatToParts(inputDate);
    return `${day} / ${month} / ${year}`
  }
}
