import { Injectable } from '@angular/core';

@Injectable()
export class CommonWebStorageServiceMock {

    public getSessionStorage(key: string): any {
        return key;
    }

    public getLocalStorage(key: string): any {
        return key;
    }

    public setSessionStorage(key: string, value: any): any {
        return key;
    }

    public setLocalStorage(key: string, value: any): any {
        return key;
    }
}