import { Injectable } from '@angular/core';
import { CommonHttpService } from '../common/app.httpservice';

@Injectable()
export class DoctorService {
  constructor(
    private http: CommonHttpService
  ){}

  public getDoctors(uri: string) {
	  return this.http.get(uri, );
  }

  public postDoctors(uri: string, data:any) {
	  return this.http.post(uri, data);
  }

}






