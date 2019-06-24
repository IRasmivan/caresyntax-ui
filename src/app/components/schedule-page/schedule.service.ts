import { Injectable } from '@angular/core';
import { CommonHttpService } from '../common/app.httpservice';

@Injectable()
export class ScheduleService {
  constructor(
    private http: CommonHttpService
  ){}

  public getSchedules(uri: string) {
	  return this.http.get(uri, );
  }

  public postSchedules(uri: string, data:any) {
	  return this.http.post(uri, data);
  }

}






