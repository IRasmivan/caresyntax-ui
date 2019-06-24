import { Component, OnInit } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { DataService } from '../common/common.service';
import { AppConfig } from '../common/app.config';
import { CommonHttpService } from '../common/app.httpservice';
import { CommonWebStorageService } from '../common/webstorage.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'mtp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent{

  // Local Variable
  private userdetails: string;
  private uri : string;
  private loginres : string;
  private role : string;
  private roleh : string;
  private adminshow : boolean;
  private guesthow : boolean;
  private showrole : boolean;

  private isSignOnVar_:boolean;
  private user:any;
  private username:any;
  private title:string;
  private endpoint : string;
  
  constructor(
				public _http: Http,
                public _httphandler : CommonHttpService,
				public appConfig: AppConfig,
                public _localSessionService : CommonWebStorageService,
                private router : Router,
				public dataservice : DataService) {
					
                    
         
        }

      routetoMenu(){
        this.router.navigate(["/menuPage"]);
        }

    public ngDoCheck() {	
    }

}
