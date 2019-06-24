import { Component, OnInit } from '@angular/core'; 
import { DataService } from '../common/common.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private dataservice: DataService) {
					this.dataservice.dataObs$ = '';
					this.dataservice.dataObsline2$ = '';
				 }

  ngOnInit() { }

}
