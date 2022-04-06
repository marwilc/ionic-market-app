import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list-detail',
    templateUrl: './list-detail.component.html',
    styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent implements OnInit {
    slideOpts = {
        initialSlide: 0,
        speed: 400,
        slidesPerView: 2.2,
        spaceBetween: 10,
    };

    showSelected: boolean;

    typeView: string = 'list';

    constructor() {
        this.showSelected = false;
    }

    ToggleButton() {
        this.showSelected = !this.showSelected;
    }

    changeToList() {
        this.typeView = 'list';
    }
    changeToGrid() {
        this.typeView = 'grid';
    }

    ngOnInit() {}
}
