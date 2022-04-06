import { en, es } from '@assets/i18n';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class UniversalTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return Observable.create((observer) => {
            if (lang === 'es') {
                observer.next(es);
            } else {
                observer.next(en);
            }
            observer.complete();
        });
    }
}
