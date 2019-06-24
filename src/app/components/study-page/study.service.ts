import { Injectable } from '@angular/core';
import { CommonHttpService } from '../common/app.httpservice';

@Injectable()
export class StudyService {
  constructor(
    private http: CommonHttpService
  ){}

  public getStudy(uri: string) {
	  return this.http.get(uri, );
  }

  public postStudy(uri: string, data:any) {
	  return this.http.post(uri, data);
  }

  public putStudy(uri: string, data:any) {
	  return this.http.put(uri, data);
  }

}