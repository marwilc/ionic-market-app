import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-search-header',
    templateUrl: './search-header.component.html',
    styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit {
    @Input() showBackButton: boolean;
    constructor() {}

    ngOnInit() {}
}
