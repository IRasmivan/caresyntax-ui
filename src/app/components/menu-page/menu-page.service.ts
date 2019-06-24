import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonHttpService } from './../common/app.httpservice';

@Injectable()
export class MenuPageService {
  constructor(
    private http: CommonHttpService
  ){}
  

  public searchbasicview(uri: string, args?: RequestOptionsArgs) {
	return this.http.get(uri,args);
  }

}






