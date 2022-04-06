import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(arr: any[], key: string, value: string): any[] {
        return arr.filter((i) => i[key] === value);
    }
}
