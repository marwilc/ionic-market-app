import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    showSelected: boolean;
    showSelected2: boolean;
    showSelected3: boolean;
    constructor() {
        this.showSelected = false;
        this.showSelected2 = false;
        this.showSelected3 = false;
    }

    ToggleButton() {
        this.showSelected = !this.showSelected;
    }
    ToggleButton2() {
        this.showSelected2 = !this.showSelected2;
    }
    ToggleButton3() {
        this.showSelected3 = !this.showSelected3;
    }

    ngOnInit() {}
}
