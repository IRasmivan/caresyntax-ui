import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppConfig } from './../common/app.config';
import { DataService } from '../common/common.service';
import { CommonWebStorageService } from './../common/webstorage.utils';
import { MenuPageService } from './../menu-page/menu-page.service';


@Component({
	selector: 'menu-page',
	templateUrl: './menu-page.component.html',
	styleUrls: ['./menu-page.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class MenuPageComponent implements OnInit {

	// Local Variable
	private uri: string;
	private productRole: any;
	private locationRole: any;
	private eatInRole: any;
	private eventRole: any;
	private financialCalenderRole: any;
	private showloader: any;
	private showError: any;
	private noRole: any;
	private notAuthorized: any;

	constructor(public _localSessionService: CommonWebStorageService,
		private router: Router,
		private dataservice: DataService,
		private _appConstants: AppConfig,
		private MenuPageService: MenuPageService) {
		this.dataservice.dataObs$ = 'Rasmivan CareSyntax';
		this.dataservice.dataObsline2$ = 'Portal';
	}
	ngOnInit() {
	}

	public navigateToDoctor(){
		this.router.navigate(["./doctor"]);
	}

}