import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../common/common.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { RoomService } from './room.service';
import {AppConfig } from '../common/app.config';


@Component({
	selector: 'room',
	templateUrl: './room.component.html',
	styleUrls: ['./room-page.component.css']
})

export class RoomComponent implements OnInit {

	private disableViewDataTable: boolean;
	private resultviewerror: boolean;
	private noRoom: boolean;
	private loader: boolean;
	private cols: any[];
	private dataMarts: any[];
	private first = 0;
	private isInit: boolean;
	private roomPageNo: any;
	private rowPerPage: any;
	private totalRecords: Number;
	private message: any;
	private saveSuccess: boolean;
	private saveError: boolean;
	private saveErrorMessage: any;
	private disableRefresh: boolean;

	// Constructor
	constructor(private dataservice: DataService,
		private roomService: RoomService,
		private appConfig: AppConfig) {
		this.loader = true;
		this.rowPerPage = 6;
		this.disableViewDataTable = false
		this.noRoom = false;
		this.saveSuccess = false;
		this.saveError = false;
		this.disableRefresh = true;
	}

	// On page Load
	ngOnInit() {
		this.dataservice.dataObs$ = 'Room';
		this.dataservice.dataObsline2$ = 'view';
		this.loader = true;
		this.disableViewDataTable = true;
		this.cols = [
			{ field: 'id', header: 'Id' },
			{ field: 'roomName', header: 'Room Name' }
		  ];
	}


	getRoomService(pageNo: any) {
		this.disableRefresh = false;
		this.loader = true;
		this.resultviewerror = false;
		this.dataMarts = [];
		this.message = this.appConfig.generalErrorMsg;
		let apiurl = this.appConfig.uri_rooms + '?pageNumber=' + pageNo + '&pageSize=' + this.rowPerPage;
		this.roomService.getRooms(apiurl).subscribe(
			data => {
				this.totalRecords = data.totalElements;
				if(this.totalRecords == 0) {
					this.disableViewDataTable = false;
					this.noRoom = true;
					this.disableRefresh = true;
				}
				else {
					this.disableViewDataTable = true;
					this.noRoom = false;
				}
				for(const doc of data.content){
					this.dataMarts.push( {'id': doc.id, 'roomName' : doc.name});
				}
			},
			error => {
				this.resultviewerror = true;
				this.disableViewDataTable = false;
				this.message = JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
				
			});
		this.loader = false;
	}

	loadRoomLazy(event: LazyLoadEvent) {
		if (this.isInit) {
			this.isInit = false;
			if (event.first == undefined) {
				this.first = event.rows * this.roomPageNo;
				event.first = this.first;
			}
		} else {
			if (event.first == undefined) {
				this.first = event.rows * this.roomPageNo;
				event.first = this.first;
			}
			this.roomPageNo = (event.first / event.rows);
		}
		this.getRoomService(this.roomPageNo);
	}

	onSubmit(roomAddForm){
		this.postRoomService(roomAddForm);
	}

	postRoomService(roomAddForm: any) {
		this.saveSuccess = false;
		this.saveError = false;
		this.saveErrorMessage = this.appConfig.generalErrorMsg;
		let apiurl = this.appConfig.uri_add_room;
		let pRoom = {"name": roomAddForm.value.roomName};
		this.roomService.postRoom(apiurl, pRoom).subscribe(
			data => {
				this.saveSuccess = true;
				this.saveError = false;
			},
			error => {
				this.saveError = true;
				this.saveSuccess = false;
				this.saveErrorMessage = this.appConfig.doctorErrorMsg + JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
			});
		this.loader = false;
	}

	changeRoomName(){
		this.saveSuccess = false;
		this.saveError = false;
	}

}
