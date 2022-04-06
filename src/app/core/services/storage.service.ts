import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {}

    async get(key: string): Promise<any> {
        const item = await Storage.get({ key });
        return JSON.parse(item.value);
    }

    async set(key: string, value: any): Promise<any> {
        return await Storage.set({
            key,
            value: JSON.stringify(value),
        });
    }

    async remove(key: string): Promise<any> {
        return await Storage.remove({ key });
    }

    async clear(): Promise<any> {
        return await Storage.clear();
    }
}
