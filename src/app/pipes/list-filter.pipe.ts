import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(list: any[], filter: { field: string, value: any }): any[] {
    return list.filter(value => (!value[filter.field] || value[filter.field] === filter.value));
  }

}
