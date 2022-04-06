import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
    OnlyChars,
    OnlyNumbers,
} from '@core/validators/validator.pattern';
import { TranslatePipe } from '@ngx-translate/core';

@Pipe({
    name: 'formErrorMessage',
})
export class FormErrorMessagePipe implements PipeTransform {
    constructor(
        private _translate: TranslatePipe,
        private _number: DecimalPipe
    ) {}

    transform(control: AbstractControl, value: any): string {
        const errors: ValidationErrors = control.errors;
        if (errors.required) {
            return 'general.required';
        }

        if (errors.minlength) {
            return `general.min${errors.minlength.requiredLength}Chars`;
        }

        if (errors.maxlength) {
            return `general.max${errors.maxlength.requiredLength}Chars`;
        }

        if (errors.min) {
            return `${this._translate.transform(
                'general.minValue'
            )} ${this._number.transform(errors.min.min, '1.1-2')}`;
        }

        if (errors.pattern) {
            if (
                errors.pattern.requiredPattern === String(OnlyChars)
            ) {
                return 'general.onlyLetters';
            }

            if (
                errors.pattern.requiredPattern === String(OnlyNumbers)
            ) {
                return 'general.onlyNumbers';
            }
        }

        return '';
    }
}
