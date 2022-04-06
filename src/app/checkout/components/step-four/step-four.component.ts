import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appInfo } from '@config/app.config';
import {
    AccountEnum,
    AccountPayment,
    AccountType,
} from '@core/models/account-type.model';
import { FileModel } from '@core/models/file.model';
import {
    PaymentMethod,
    PaymentType,
} from '@core/models/payment.model';
import { PriceDolarService } from '@core/services';
export const MAX_PAYMENTS = 2;
@Component({
    selector: 'app-step-four',
    templateUrl: './step-four.component.html',
    styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent implements OnInit {
    @Output() onComplete = new EventEmitter();
    @Input() total: number;

    buttonCheckoutIntersect: boolean = false;

    paidOut: number = 0;

    MAX_PAYMENTS = MAX_PAYMENTS;

    paymentsMethods: PaymentMethod[] = [
        {
            name: 'general.singlePayment',
            description: 'general.singlePaymentDescription',
            type: PaymentType.SINGLE_PAYMENT,
        },
        {
            name: 'general.multiPayment',
            description: 'general.multiPaymentDescription',
            type: PaymentType.MULTI_PAYMENT,
        },
    ];

    accountTypes: AccountType[] = [
        {
            id: 1,
            name: 'Zelle',
            type: AccountEnum.ZELLE,
            image: 'assets/images/zelle.png',
        },
        {
            id: 2,
            name: 'Paypal',
            type: AccountEnum.PAYPAL,
            image: 'assets/images/paypal.png',
        },
        {
            id: 3,
            name: 'Efectivo',
            type: AccountEnum.CASH,
            image: 'assets/images/money.png',
        },
        {
            id: 4,
            name: 'Transferencia Bancaria',
            type: AccountEnum.TRANSFER_BANK,
            image: 'assets/images/wire-transfer.png',
        },
    ];

    accountPayments: AccountPayment[] = [
        {
            mail: 'market@gmail.com',
            name: 'App Market',
            description:
                'Antes de hacer el pago, por favor, verificar el correo:',
            type: AccountEnum.ZELLE,
            image: 'assets/images/zelle_1.jpg',
        },
        {
            mail: 'market2@gmail.com',
            name: 'Market LLC',
            description:
                'Antes de hacer el pago, por favor, verificar el correo:',
            type: AccountEnum.ZELLE,
            image: 'assets/images/zelle_2.jpg',
        },
        {
            mail: 'https://paypal.me/market?locale.x=en_US',
            name: 'paypal',
            description:
                'Si tienes cuenta PayPal, haz click en el siguiente enlace y coloca el monto a pagar y envíanos Saldo PayPal.',
            type: AccountEnum.PAYPAL,
            image: 'assets/images/paypal.png',
        },
        {
            mail: '',
            name: 'Efectivo USD',
            description:
                'Si tienes cuenta PayPal, haz click en el siguiente enlace y coloca el monto a pagar y envíanos Saldo PayPal.',
            type: AccountEnum.CASH,
            image: 'assets/images/paypal.png',
        },
        {
            mail: '',
            name: 'Efectivo EURO',
            description:
                'Si tienes cuenta PayPal, haz click en el siguiente enlace y coloca el monto a pagar y envíanos Saldo PayPal.',
            type: AccountEnum.CASH,
            image: 'assets/images/paypal.png',
        },
        {
            mail: '',
            name: 'Efectivo BsS',
            description:
                'Si tienes cuenta PayPal, haz click en el siguiente enlace y coloca el monto a pagar y envíanos Saldo PayPal.',
            type: AccountEnum.CASH,
            image: 'assets/images/paypal.png',
        },
        {
            mail: '',
            name: 'Banco Banesco',
            description:
                'Si tienes cuenta PayPal, haz click en el siguiente enlace y coloca el monto a pagar y envíanos Saldo PayPal.',
            type: AccountEnum.TRANSFER_BANK,
            image: 'assets/images/bank_banesco.jpg',
        },
        {
            mail: '',
            name: 'Banco Provincial',
            description:
                'Si tienes cuenta PayPal, haz click en el siguiente enlace y coloca el monto a pagar y envíanos Saldo PayPal.',
            type: AccountEnum.TRANSFER_BANK,
            image: 'assets/images/bank_provincial.jpg',
        },
    ];

    selectedPaymentMethod: PaymentMethod = this.paymentsMethods[0];
    selectedAccountType: AccountType;
    accountEnums = AccountEnum;
    payTypes = PaymentType;

    selectedPayment: AccountPayment;
    multiPayments: AccountPayment[] = [];
    vesCurrency: string = appInfo.bsCurrencySymbol;
    bolivarXDollar: number = 0;

    forms = {
        [AccountEnum.ZELLE]: this._createZelleForm(),
        [AccountEnum.PAYPAL]: this._createPaypalForm(),
        [AccountEnum.CASH]: this._createCashForm(),
        [AccountEnum.TRANSFER_BANK]: this._createTransferBankForm(),
    };
    singlePayment: {
        paymentData: any;
        mail?: string;
        name?: string;
        description?: string;
        identityDocument?: string;
        accountNumber?: string;
        image: string;
        type: AccountEnum;
    };
    images: FileModel[] = [];

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 2.5,
        spaceBetween: 5,
    };

    constructor(
        private _dollarPrice: PriceDolarService,
        private _fb: FormBuilder
    ) {}

    get isInvalid(): boolean {
        return this.forms[this.selectedPayment.type].invalid;
    }

    async ngOnInit() {
        this.bolivarXDollar = Number(
            await this._dollarPrice.getPriceDollar()
        );

        setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    this.buttonCheckoutIntersect = false;
                } else {
                    this.buttonCheckoutIntersect = true;
                }
            });

            observer.observe(document.querySelector('.watch-total'));
        }, 2);
    }

    onChangePaymentMethod(event) {
        if (
            this.selectedPaymentMethod.type !==
            event.detail.value.type
        ) {
            this.selectedPayment = null;
            this.selectedAccountType = null;
            this.multiPayments = [];
            this.paidOut = 0;
            this.createForms();
        }

        this.selectedPaymentMethod = event.detail.value;
    }

    selectPayment(payment: AccountPayment) {
        this.selectedPayment = payment;
    }

    onChangeAccountType(type: AccountType) {
        this.selectedAccountType = type;

        this.selectedPayment = this.accountPayments.find(
            (p) => p.type === this.selectedAccountType.type
        );
    }

    registerPayment() {
        this.markTouchedForm();
        if (this.isInvalid) {
            return;
        }

        if (
            this.selectedPaymentMethod.type ===
            PaymentType.MULTI_PAYMENT
        ) {
            if (!this.isValidLastPayment()) {
                return;
            }
            const singlePayment = {
                ...this.patchSinglePaymentData(),
            };

            this.multiPayments.push({ ...singlePayment });
            this.paidOut = this.multiPayments.reduce(
                (i, ap) => i + ap.paymentData.amount,
                0
            );
            this.selectedPayment = null;
            this.selectedAccountType = null;
            this.createForms();

            if (this.multiPayments.length === MAX_PAYMENTS) {
                this.onComplete.emit(this.multiPayments);
            }
        } else {
            if (!this.isValidSingleLastPayment()) {
                return;
            }

            this.singlePayment = { ...this.patchSinglePaymentData() };
            this.paidOut = this.singlePayment.paymentData.amount;

            this.createForms();

            this.selectedPayment = null;
            this.selectedAccountType = null;

            this.onComplete.emit(this.singlePayment);
        }
    }

    isValidSingleLastPayment() {
        const paymentData =
            this.forms[this.selectedPayment.type].value;

        const min = this.total - this.paidOut;

        if (this.paidOut + paymentData.amount < this.total) {
            this.forms[this.selectedPayment.type]
                .get('amount')
                .setValidators(Validators.min(min));
            this.forms[this.selectedPayment.type]
                .get('amount')
                .updateValueAndValidity();
        }

        return this.paidOut + paymentData.amount >= this.total;
    }

    isValidLastPayment() {
        if (this.multiPayments.length === MAX_PAYMENTS - 1) {
            const paymentData =
                this.forms[this.selectedPayment.type].value;

            const min = this.total - this.paidOut;

            if (this.paidOut + paymentData.amount < this.total) {
                this.forms[this.selectedPayment.type]
                    .get('amount')
                    .setValidators(Validators.min(min));
                this.forms[this.selectedPayment.type]
                    .get('amount')
                    .updateValueAndValidity();
            }

            return this.paidOut + paymentData.amount >= this.total;
        }

        return true;
    }
    markTouchedForm() {
        this.forms[this.selectedPayment.type].markAllAsTouched();
    }

    /**
     * Patch single data of payment user
     *
     * @return {*}
     * @memberof StepFourComponent
     */
    patchSinglePaymentData() {
        const paymentData = {
            ...this.forms[this.selectedPayment.type].value,
        };
        return {
            ...this.selectedPayment,
            paymentData,
        };
    }

    removeMultiPayment(index: number) {
        this.multiPayments.splice(index, 1);
        this.paidOut = this.multiPayments.reduce(
            (i, ap) => i + ap.paymentData.amount,
            0
        );
    }

    createForms() {
        this.forms = {
            [AccountEnum.ZELLE]: this._createZelleForm(),
            [AccountEnum.PAYPAL]: this._createPaypalForm(),
            [AccountEnum.CASH]: this._createCashForm(),
            [AccountEnum.TRANSFER_BANK]:
                this._createTransferBankForm(),
        };
    }

    removeSinglePayment() {
        this.singlePayment = null;
    }

    onChangeImage(event) {
        //let index = this.selectedIndex;
        if (event.target.files && this.images.length < 2) {
            const files = [...event.target.files];
            files.forEach((element) => {
                const reader = new FileReader();
                const file = element;
                let base64;

                reader.onload = (_event) => {
                    base64 = reader.result as string;

                    const image: FileModel = {
                        url: base64,
                        extension: '',
                        name: '',
                        origin: '',
                    };

                    // for update one image else upload multiple images
                    if (this.images.length < 2) {
                        this.images.push({ ...image });
                        this.forms.cash
                            .get('images')
                            .setValue(this.images);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    }

    deleteImage(index: number) {
        this.images.splice(index, 1);
    }

    private _createZelleForm(): FormGroup {
        return this._fb.group({
            accountHolder: ['', [Validators.required]],
            amount: ['', [Validators.required]],
        });
    }

    private _createPaypalForm(): FormGroup {
        return this._fb.group({
            accountHolder: ['', [Validators.required]],
        });
    }

    private _createCashForm(): FormGroup {
        return this._fb.group({
            note: ['', [Validators.maxLength(100)]],
            amount: ['', [Validators.required]],
            wantCredit: [false],
            images: '',
        });
    }

    private _createTransferBankForm(): FormGroup {
        return this._fb.group({
            referenceInformation: ['', [Validators.required]],
            amount: ['', [Validators.required]],
            fromAnotherBank: [false],
        });
    }
}
