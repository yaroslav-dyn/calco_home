import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchString'
})

export class MatchPipe implements PipeTransform {
  transform(value, option) {
    if (option === 'all') {
      return value
    } else {
      return value.filter(el => el.group === option);
    }
  }
}
