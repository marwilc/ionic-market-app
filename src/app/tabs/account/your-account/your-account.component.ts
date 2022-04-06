import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-your-account',
    templateUrl: './your-account.component.html',
    styleUrls: ['./your-account.component.scss'],
})
export class YourAccountComponent implements OnInit {
    setupItems = [
        {
            label: 'general.addresses',
            router: '/tabs/account/your-address',
        },
    ];

    constructor() {}

    ngOnInit() {}
}
