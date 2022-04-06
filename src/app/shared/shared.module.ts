import {
    CommonModule,
    DatePipe,
    DecimalPipe,
    registerLocaleData,
} from '@angular/common';
import es from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { TranslationsService } from '@core/services/translation.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { ProductCarouselComponent } from '../product/components';
import { SearchHeaderComponent } from './components';
import { IonErrorComponent } from './components/ion-error';
import { SegmentHeaderComponent } from './components/segment-header/segment-header.component';
import { ImgFallbackDirective } from './directives';
import { FilterPipe } from './pipes/filter.pipe';
import { FormErrorMessagePipe } from './pipes/form-error-message.pipe';
import { FreeShippingPipe } from './pipes/free-shipping.pipe';
import { ImagePipe } from './pipes/image.pipe';

registerLocaleData(es);

const components = [
    SearchHeaderComponent,
    SegmentHeaderComponent,
    ProductCarouselComponent,
    IonErrorComponent,
];
const pipes = [
    ImagePipe,
    FreeShippingPipe,
    FilterPipe,
    FormErrorMessagePipe,
];
const directives = [ImgFallbackDirective];
const modules = [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FlexLayoutModule,
    RouterModule,
    MatExpansionModule,
    NgxMaskModule.forRoot({}),
];

@NgModule({
    declarations: [...components, pipes, ...directives],
    imports: [modules],
    exports: [modules, ...components, ...pipes, ...directives],
    providers: [
        ...pipes,
        DatePipe,
        DecimalPipe,
        TranslatePipe,
        {
            provide: LOCALE_ID,
            deps: [TranslationsService], //some service handling global settings
            useFactory: (translationService) =>
                translationService.getLanguage(), //returns locale string
        },
    ],
})
export class SharedModule {}
