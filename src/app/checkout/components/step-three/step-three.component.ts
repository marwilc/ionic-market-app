import {
    Component,
    EventEmitter,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    OnlyChars,
    OnlyNumbers,
} from '@core/validators/validator.pattern';

@Component({
    selector: 'app-step-three',
    templateUrl: './step-three.component.html',
    styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent implements OnInit {
    @Output() onComplete = new EventEmitter();
    billingForm: FormGroup = this._createBillingForm();

    docsPrefix: string[] = ['V', 'E', 'J', 'G'];
    docPrefix: string = this.docsPrefix[0];
    doNotSendAnInvoice: boolean = false;

    constructor(private _fb: FormBuilder) {}

    ngOnInit() {}

    accept() {
        this.billingForm.markAllAsTouched();
        if (this.billingForm.invalid) {
            return;
        }

        const {
            name,
            phone,
            identityDocument,
            address,
            optionalRequirement,
            sendInvoice,
        } = this.billingForm.value;

        this.onComplete.emit({
            name,
            phone,
            identityDocument: `${this.docPrefix}-${identityDocument}`,
            address,
            optionalRequirement,
            sendInvoice,
        });
    }

    onDocPrefixChange(event) {
        this.docPrefix = event.detail.value;
    }

    private _createBillingForm(): FormGroup {
        return this._fb.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.pattern(OnlyChars),
                    Validators.minLength(3),
                    Validators.maxLength(25),
                ],
            ],
            phone: [
                '',
                [
                    Validators.required,
                    Validators.pattern(OnlyNumbers),
                ],
            ],
            identityDocument: [
                '',
                [
                    Validators.required,
                    Validators.pattern(OnlyNumbers),
                ],
            ],
            address: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                ],
            ],
            optionalRequirement: ['', Validators.maxLength(100)],
            sendInvoice: [false, []],
        });
    }
}
