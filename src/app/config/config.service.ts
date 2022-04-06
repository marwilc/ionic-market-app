import { Injectable } from '@angular/core';
import { appInfo, appRoutes, Config } from './app.config';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    static config: Partial<Config> = {
        routes: appRoutes,
        appInfo,
    };

    constructor() {}
}
