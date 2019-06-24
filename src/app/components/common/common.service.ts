import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DataService {
    public dataObs$: string;
    public dataObsline2$: string;
    public selectedEvent: Array<any>;
    
}