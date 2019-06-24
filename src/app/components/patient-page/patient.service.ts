import { Injectable } from '@angular/core';
import { CommonHttpService } from '../common/app.httpservice';

@Injectable()
export class PatientService {
  constructor(
    private http: CommonHttpService
  ){}

  public getPatient(uri: string) {
	  return this.http.get(uri, );
  }

  public postPatient(uri: string, data:any) {
	  return this.http.post(uri, data);
  }

  public putPatient(uri: string, data:any) {
	  return this.http.put(uri, data);
  }

}






