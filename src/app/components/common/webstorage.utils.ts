import {Injectable} from '@angular/core';

@Injectable()
export class CommonWebStorageService {
	
	//Storage Keys to make the key usage consistent & to avoid duplicates

    public getSessionStorage(key:string) : any{
        return sessionStorage.getItem(key);
    }

    public getLocalStorage(key:string) : any{
        return localStorage.getItem(key);
    }
	
	public setSessionStorage(key:string,value:any) : any{
        return sessionStorage.setItem(key,value);
    }

    public setLocalStorage(key:string,value:any) : any{
        return localStorage.setItem(key,value);
    }
}