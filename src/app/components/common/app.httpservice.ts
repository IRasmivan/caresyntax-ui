import {Injectable} from '@angular/core';
import {Http, Request, Response, Headers, RequestOptionsArgs, RequestMethod} from "@angular/http";
import {RequestArgs} from "@angular/http/src/interfaces";
import {Observable} from 'rxjs/Observable';
import {CommonWebStorageService} from './webstorage.utils'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {AppConfig} from './app.config';

@Injectable()
export class CommonHttpService {
	
    protected headers: Headers;
    private jwtToken:string;
    private _commonWebStor: CommonWebStorageService
	
    constructor(private _http: Http, 
        private appConfig: AppConfig, 
        private _commonWebStorage: CommonWebStorageService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Basic dXNlcjpwYXNzd29yZA==');
        this.appConfig=appConfig;
    }

	getFullUrl(url:string){
		return url;//this.appConfig.ServerWithApiUrl+url;
	}

    get(url:string, args?: RequestOptionsArgs) : Observable<any> {
        if (args == null) args = {};
        if (args.headers === undefined) args.headers = this.headers;    
        return this._http.get(url, args)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    post(url:string, data:any, args?: RequestOptionsArgs) : Observable<any> {
        if (args == null) args = {};
        if (args.headers === undefined) args.headers = this.headers;
        return this._http.post(this.getFullUrl(url), JSON.stringify(data), args)
            .map((res: Response) => CommonHttpService.json(res))
            .catch(this.handleError);
    }


    postFormData(url:string, data:any, args?: RequestOptionsArgs) : Observable<any> {
        if (args == null) args = {};
        if (args.headers === undefined) args.headers = this.headers;
        return this._http.post(this.getFullUrl(url), data, args)
            .map((res: Response) => CommonHttpService.json(res))
            .catch(this.handleError);
    }


    put(url:string, data:any, args?: RequestOptionsArgs) : Observable<any> {
        if (args == null) args = {};
        if (args.headers === undefined) args.headers = this.headers;
        return this._http.put(this.getFullUrl(url), JSON.stringify(data), args)
            .map((res: Response) => CommonHttpService.json(res))
            .catch(this.handleError);
    }

    remove(url: string, data?: any, args?: RequestOptionsArgs): Observable<any> {
        if (args == null) args = {};

        args.url = this.getFullUrl(url);
        args.method = RequestMethod.Delete;
        if (!args.headers) args.headers = this.headers;
        args.body  = data ? JSON.stringify(data) : null;

        return this._http.request(new Request(<RequestArgs>args))
            .map((res: Response) => CommonHttpService.json(res))
            .catch(this.handleError);
    }

    private static json(res: Response): any {
        return res;
    }

    private handleError(error:any) {
         console.log("App Service Error"+error);
        return Observable.throw(error);
    }
}
