import { Pipe, PipeTransform } from '@angular/core';

const DEFAULT_LIMIT = 200;

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = DEFAULT_LIMIT): unknown {
    if (!value) return '';

    if (value.length <= limit) {
      return value;
    }

    return `${value.substring(0, limit)}...`;
  }

}
