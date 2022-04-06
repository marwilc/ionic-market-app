import { DatePipe } from '@angular/common';
import {
    Component,
    EventEmitter,
    OnInit,
    Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { appInfo } from '@config/app.config';
import {
    ShippingDay,
    ShippingTime,
    ShippingTimeOps,
    ShippingType,
} from '@core/models/shipping-method.model';
import { PriceDolarService } from '@core/services';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-step-two',
    templateUrl: './step-two.component.html',
    styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit {
    @Output() onComplete = new EventEmitter();

    todayCopy = new Date();

    today = new Date();
    tomorrow = this.todayCopy.setDate(this.todayCopy.getDate() + 1);
    afterTomorrow = this.todayCopy.setDate(
        this.todayCopy.getDate() + 1
    );

    tipControl = new FormControl('', [
        Validators.pattern('^[0-9]*$'),
    ]);

    shippingDays: ShippingDay[] = [
        {
            label: this._translatePipe.transform('general.today'),
            date: this.today,
            type: ShippingType.FREE,
        },
        {
            label: this._datePipe.transform(this.tomorrow, 'E'),
            date: new Date(this.tomorrow),
            type: ShippingType.PROGRAMMED,
        },
        {
            label: this._datePipe.transform(this.afterTomorrow, 'E'),
            date: new Date(this.afterTomorrow),
            type: ShippingType.PROGRAMMED,
        },
    ];

    shippingTimeOps: ShippingTimeOps[] = [
        {
            name: 'general.free',
            type: ShippingType.FREE,
            total: 0.0,
            price: 0.0,
            hours: 3,
            description: 'general.afterConfirmingThePayment',
        },
        {
            name: 'general.scheduleYourShipment',
            type: ShippingType.PROGRAMMED,
            total: 1.22,
            price: 1.22,
            description: 'general.selectASchedule',
        },
    ];

    messageMapping: { [k: string]: string } = {
        '=0': 'general.hour',
        '=1': 'general.hour',
        other: 'general.hours',
    };

    availableHours: string[] = [
        '8:00 AM a 10:00 AM',
        '10:00 AM a 12:00 PM',
        '12:00 PM a 2:00 PM',
        '2:00 PM a 4:00 PM',
    ];

    tips: number[] = [0.0, 1.0, 2.0, 5.0, 10.0, 15.0];

    daySelected: ShippingDay = this.shippingDays[0];
    shippingOpSelected: ShippingTimeOps = this.shippingTimeOps[0];
    hourSelected: string;
    selectedTip: number;

    shippingTime: ShippingTime;

    equivalentTipInBs: number = 0;

    shippingTypes = ShippingType;
    bolivarXDollar: number = 0;
    vesCurrency: string = appInfo.bsCurrencySymbol;

    constructor(
        private _datePipe: DatePipe,
        private _translatePipe: TranslatePipe,
        private _dollarPrice: PriceDolarService
    ) {}

    async ngOnInit() {
        this.bolivarXDollar = Number(
            await this._dollarPrice.getPriceDollar()
        );

        this.tipControl.valueChanges.subscribe((value) => {
            if (value) {
                this.equivalentTipInBs = value * this.bolivarXDollar;
            } else {
                this.equivalentTipInBs = 0;
            }
        });
    }

    continue() {
        this.shippingTime = {
            date: this.daySelected.date.toISOString(),
            type: this.shippingOpSelected.type,
            price: this.shippingOpSelected.price,
            tip: this.tipControl.value ? this.tipControl.value : 0,
            time: this.hourSelected,
        };
        this.onComplete.emit(this.shippingTime);
    }

    onChangeDay(event) {
        this.daySelected = event.detail.value;
        this.shippingOpSelected = this.shippingTimeOps.find(
            (o) => o.type === this.daySelected.type
        );
    }
    onChangeShippingOp(event) {
        this.shippingOpSelected = event.detail.value;
    }

    onChangeHour(event) {
        this.hourSelected = event.detail.value;
    }

    selectTip(tip: number) {
        this.selectedTip = tip;
        this.tipControl.setValue(tip);
    }
}
