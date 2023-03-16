import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'amount', pure: false})
export class AmountPipe implements PipeTransform {
  transform(value: ILineItem) {
    return value.pricePerUnit * value.quantity;
  }
}