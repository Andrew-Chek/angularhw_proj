import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {

  transform<T>(value: T[] | null, order: 'asc' | 'desc' = 'asc', column: keyof T,): T[] | null
  {
    return orderBy(value, [column], [order]);
  }
}