import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class TranslationsService {
    constructor(private _translate: TranslateService) {}

    initLanguage() {
        this._translate.use('es');
    }

    getLanguage() {
        return this._translate.currentLang;
    }
}
