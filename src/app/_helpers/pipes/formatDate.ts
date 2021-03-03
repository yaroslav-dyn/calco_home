import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatDate'
})


export class FormatDate implements PipeTransform {
  private  defaultOption = { year: 'numeric', month: 'short', day: '2-digit' };

  transform(date, option) {

    const opt = option ? option : this.defaultOption;

    const configDate = new Intl.DateTimeFormat('en', opt);
    const inputDate = new Date(date);

    const [{ value: month }, , { value: day }, , { value: year }] = configDate.formatToParts(inputDate);
    return `${day} / ${month} / ${year}`;
  }
}
