import { Injectable } from '@angular/core';
import { CommonHttpService } from '../common/app.httpservice';

@Injectable()
export class RoomService {
  constructor(
    private http: CommonHttpService
  ){}

  public getRooms(uri: string) {
	  return this.http.get(uri, );
  }

  public postRoom(uri: string, data:any) {
	  return this.http.post(uri, data);
  }

}






