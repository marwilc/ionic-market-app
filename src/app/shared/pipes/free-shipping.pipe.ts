import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'freeShipping',
})
export class FreeShippingPipe implements PipeTransform {
    transform(
        value: boolean,
        shippingValue: number,
        currency: string
    ): string {
        return value
            ? 'general.freeShipping'
            : `${currency} ${shippingValue}`;
    }
}
