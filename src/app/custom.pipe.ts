import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
  standalone: true
})
export class CustomPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    if (typeof value !== 'string') {
      return value;
    }

    return value.charAt(0).toLowerCase() + value.slice(1);

     


}
}
