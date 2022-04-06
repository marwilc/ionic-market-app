import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { UniversalTranslateLoader } from '@config/universal-translate-loader';
import { CoreModule } from '@core/core.module';
import { environment } from '@env/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
    TranslateLoader,
    TranslateModule,
} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers } from './app.reducer';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        CoreModule,
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot({ ...appReducers }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: UniversalTranslateLoader,
            },
        }),
        BrowserAnimationsModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
