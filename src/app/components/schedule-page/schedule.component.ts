import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../common/common.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { ScheduleService } from './schedule.service'
import {AppConfig } from '../common/app.config';
import { DoctorService } from '../doctor-page/doctor.service'
import { PatientService } from '../patient-page/patient.service'
import { StudyService } from '../study-page/study.service';
import { RoomService } from '../room-page/room.service';


@Component({
	selector: 'schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule-page.component.css']
})

export class ScheduleComponent implements OnInit {

	private scheduleView: boolean;
	private disableViewDataTable: boolean;
	private resultviewerror: boolean;
	private noSchedule: boolean;
	private loader: boolean;
	private cols: any[];
	private dataMarts: any[];
	private first = 0;
	private isInit: boolean;
	private schedulePageNo: any;
	private rowPerPage: any;
	private totalRecords: Number;
	private message: any;
	private saveSuccess: boolean;
	private saveError: boolean;
	private saveErrorMessage: any;
	private disableRefresh: boolean;

	private noDoctor: any;
	private doctorTotalRecords: any;
	private doctoMarts: any;
	private doctoCols : any;
	private doctorPageNo: any;	
	private selectedDoctorRow: any;
	private validDoctorSelected: boolean;


	private noPatient: any;
	private patientTotalRecords: any;
	private patientMarts: any;
	private patientCols : any;
	private patientPageNo: any;	
	private selectedPatientRow: any;
	private validPatientSelected: boolean;


	private noStudy: any;
	private studyTotalRecords: any;
	private studyMarts: any;
	private studyCols : any;
	private studyPageNo: any;	
	private selectedStudyRow: any;
	private validStudySelected: boolean;


	private noRoom: any;
	private roomTotalRecords: any;
	private roomMarts: any;
	private roomCols : any;
	private roomPageNo: any;	
	private selectedRoomRow: any;
	private validRoomSelected: boolean;



	// Constructor
	constructor(private dataservice: DataService,
		private scheduleService: ScheduleService,
		private doctorService: DoctorService,
		private patientService: PatientService,
		private studyService: StudyService,
		private roomService: RoomService,
		private appConfig: AppConfig) {
		this.loader = true;
		this.rowPerPage = 6;
		this.disableViewDataTable = false
		this.noSchedule = false;
		this.saveSuccess = false;
		this.saveError = false;
		this.disableRefresh = true;
		this.scheduleView = true;
	}

	// On page Load
	ngOnInit() {
		this.dataservice.dataObs$ = 'Schedule';
		this.dataservice.dataObsline2$ = 'view';
		this.loader = true;
		this.disableViewDataTable = true;
		this.cols = [
			{ field: 'id', header: 'Id', display: 'table-cell' },
			{ field: 'doctorId', header: 'Doctor Id', display: 'none' },
			{ field: 'doctorName', header: 'Doctor Name', display: 'table-cell' },
			{ field: 'patientId', header: 'Patient Id', display: 'none' },
			{ field: 'patientName', header: 'Patient Name', display: 'table-cell' },
			{ field: 'studyId', header: 'Study Id', display: 'none' },
			{ field: 'studyStatus', header: 'Study Status', display: 'table-cell' },
			{ field: 'roomId', header: 'Room Id', display: 'none' },
			{ field: 'roomName', header: 'Room Name', display: 'table-cell' }
		  ];

		this.doctoCols = [
			{ field: 'id', header: 'Id' },
			{ field: 'doctorName', header: 'Doctor Name' }
		];

		this.patientCols = [
			{ field: 'id', header: 'Id' },
			{ field: 'patientName', header: 'Patient Name' },
			{ field: 'sex', header: 'Sex' },
			{ field: 'dateOfBirth', header: 'Date of Birth' }
		];

		this.studyCols = [
			{ field: 'id', header: 'Id', display: 'table-cell' },
			{ field: 'patientId', header: 'Patient Id', display: 'none' },
			{ field: 'patientName', header: 'Patient Name', display: 'table-cell' },
			{ field: 'description', header: 'Description', display: 'table-cell' },
			{ field: 'status', header: 'Status', display: 'table-cell' },
			{ field: 'plannedStartTime', header: 'Planned Start Time',display: 'table-cell' },
			{ field: 'estimatedEndTime', header: 'Estimated End Time',display: 'table-cell' },
			{ field: 'version', header: 'Version', display: 'none' },
		  ];
		
		this.roomCols = [
			{ field: 'id', header: 'Id' },
			{ field: 'roomName', header: 'Room Name' }
		];
	}

	getScheduleService(pageNo: any) {
		this.disableRefresh = false;
		this.loader = true;
		this.resultviewerror = false;
		this.dataMarts = [];
		this.message = this.appConfig.generalErrorMsg;
		let apiurl = this.appConfig.uri_schedules + '?pageNumber=' + pageNo + '&pageSize=' + this.rowPerPage;
		this.scheduleService.getSchedules(apiurl).subscribe(
			data => {
				this.totalRecords = data.totalElements;
				if(this.totalRecords == 0) {
					this.disableViewDataTable = false;
					this.noSchedule = true;
					this.disableRefresh = true;
				}
				else {
					this.disableViewDataTable = true;
					this.noSchedule = false;
				}
				for(const doc of data.content){
					this.dataMarts.push( 
						{
							'id': doc.id, 
							'doctorId' : doc.doctortId,
							'doctorName' : doc.doctorName,
							'patientId' : doc.patientId,
							'patientName' : doc.patientName,
							'studyId' : doc.studytId,
							'studyStatus' : doc.studyStatus,
							'roomId' : doc.roomtId,
							'roomName' : doc.roomName
					});
				}
			},
			error => {
				this.resultviewerror = true;
				this.disableViewDataTable = false;
				this.message = JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
				
			});
		this.loader = false;
	}

	loadScheduleLazy(event: LazyLoadEvent) {
		if (this.isInit) {
			this.isInit = false;
			if (event.first == undefined) {
				this.first = event.rows * this.schedulePageNo;
				event.first = this.first;
			}
		} else {
			if (event.first == undefined) {
				this.first = event.rows * this.schedulePageNo;
				event.first = this.first;
			}
			this.schedulePageNo = (event.first / event.rows);
		}
		this.getScheduleService(this.schedulePageNo);
	}



	changeScheduleName(){
		this.saveSuccess = false;
		this.saveError = false;
	}

	addSchedule(){
		this.dataservice.dataObsline2$ = 'Add';
		this.scheduleView = false;
	}

	getDoctorService(pageNo: any) {
		this.validDoctorSelected = false;
		this.resultviewerror = false;
		this.doctoMarts = [];
		let apiurl = this.appConfig.uri_doctors + '?pageNumber=' + pageNo + '&pageSize=' + this.rowPerPage;
		this.doctorService.getDoctors(apiurl).subscribe(
			data => {
				this.doctorTotalRecords = data.totalElements;
				if(this.doctorTotalRecords == 0) {
					this.noDoctor = true;
				}
				else {
					this.noDoctor = false;
				}
				for(const doc of data.content){
					this.doctoMarts.push( {'id': doc.id, 'doctorName' : doc.name});
				}
			},
			error => {
				this.resultviewerror = true;
				this.disableViewDataTable = false;
				this.message = JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
				
			});
		
	}

	loadDoctorLazy(event: LazyLoadEvent) {
		if (this.isInit) {
			this.isInit = false;
			if (event.first == undefined) {
				this.first = event.rows * this.doctorPageNo;
				event.first = this.first;
			}
		} else {
			if (event.first == undefined) {
				this.first = event.rows * this.doctorPageNo;
				event.first = this.first;
			}
			this.doctorPageNo = (event.first / event.rows);
		}
		this.getDoctorService(this.doctorPageNo);
	}

	onDoctorRowSelect(selectedRow: any){
		this.selectedDoctorRow = selectedRow;
		this.validDoctorSelected = true;
	}

	onDoctorRowUnselect(selectedRow: any){
		this.selectedDoctorRow = null;
		this.validDoctorSelected = false;
	}



	/* Patient Details */
	getPatientService(pageNo: any) {
		this.validPatientSelected = false;
		this.resultviewerror = false;
		this.patientMarts = [];
		let apiurl = this.appConfig.uri_patients + '?pageNumber=' + pageNo + '&pageSize=' + this.rowPerPage;
		this.patientService.getPatient(apiurl).subscribe(
			data => {
				this.patientTotalRecords = data.totalElements;
				if(this.patientTotalRecords == 0) {
					this.noPatient = true;
				}
				else {
					this.noPatient = false;
				}
				for(const patient of data.content){
					this.patientMarts.push( {
						'id': patient.id, 
						'patientName' : patient.name,
						'sex' : patient.sex,
						'dateOfBirth' : patient.dateOfBirth == null ? null : patient.dateOfBirth.substring(0,10)
					});
				}
			},
			error => {
				this.resultviewerror = true;
				this.disableViewDataTable = false;
				this.message = JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
				
			});
	}

	loadPatientLazy(event: LazyLoadEvent) {
		if (this.isInit) {
			this.isInit = false;
			if (event.first == undefined) {
				this.first = event.rows * this.patientPageNo;
				event.first = this.first;
			}
		} else {
			if (event.first == undefined) {
				this.first = event.rows * this.patientPageNo;
				event.first = this.first;
			}
			this.patientPageNo = (event.first / event.rows);
		}
		this.getPatientService(this.patientPageNo);
	}

	onPatientRowSelect(selectedRow: any){
		this.selectedPatientRow = selectedRow;
		this.validPatientSelected = true;
	}

	onPatientRowUnselect(selectedRow: any){
		this.selectedPatientRow = null;
		this.validPatientSelected = false;
	}



	/* Study Details */
	getStudyService() {
		console.log("inside study service");
		console.log(this.selectedPatientRow);
		this.validStudySelected = false;
		this.resultviewerror = false;
		this.studyMarts = [];
		let apiurl = this.appConfig.uri_study_by_patient + '?patientName=' + this.selectedPatientRow.data.patientName;
		this.studyService.getStudy(apiurl).subscribe(
			data => {
				console.log(data);
				this.roomTotalRecords = 1;
				if(this.studyTotalRecords == 0) {
					this.noStudy = true;
				}
				else {
					this.noStudy = false;
				}

				this.studyMarts.push( {
					'id': data.id, 
					'patientId' : data.patient,
					'patientName' : this.selectedPatientRow.data.patientName,
					'description' : data.description,
					'status' : data.status,
					'plannedStartTime': data.plannedStartTime,
					'estimatedEndTime': data.estimatedEndTime,
					'version': data.version
				});
			},
			error => {
				this.noStudy = true;
				this.message = JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
			});
	}

	loadStudyLazy(event: LazyLoadEvent) {
		if (this.isInit) {
			this.isInit = false;
			if (event.first == undefined) {
				this.first = event.rows * this.studyPageNo;
				event.first = this.first;
			}
		} else {
			if (event.first == undefined) {
				this.first = event.rows * this.studyPageNo;
				event.first = this.first;
			}
			this.studyPageNo = (event.first / event.rows);
		}
		this.getStudyService();
	}

	onStudyRowSelect(selectedRow: any){
		this.selectedStudyRow = selectedRow;
		this.validStudySelected = true;
	}

	onStudyRowUnselect(selectedRow: any){
		this.selectedStudyRow = null;
		this.validStudySelected = false;
	}



	/* Room Details */
	getRoomService(pageNo: any) {
		this.validRoomSelected = false;
		this.roomMarts = [];
		let apiurl = this.appConfig.uri_rooms + '?pageNumber=' + pageNo + '&pageSize=' + this.rowPerPage;
		this.roomService.getRooms(apiurl).subscribe(
			data => {
				this.roomTotalRecords = data.totalElements;
				if(this.roomTotalRecords == 0) {
					this.noRoom = true;
				}
				else {
					this.noRoom = false;
				}
				for(const room of data.content){
					this.roomMarts.push( {'id': room.id, 'roomName' : room.name});
				}
			},
			error => {
				this.noRoom = true;
				this.message = JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
			});
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

	onRoomRowSelect(selectedRow: any){
		this.selectedRoomRow = selectedRow;
		this.validRoomSelected = true;
	}

	onRooomRowUnselect(selectedRow: any){
		this.selectedRoomRow = null;
		this.validRoomSelected = false;
	}


	saveSchedule(){
		console.log(this.selectedRoomRow);
		console.log(this.selectedStudyRow);
		console.log(this.selectedPatientRow);
		console.log(this.selectedDoctorRow);


	}

	viewSchedule(){
		this.dataservice.dataObsline2$ = 'View';
		this.scheduleView = true;
		this.selectedRoomRow = "";
		this.selectedStudyRow= "";
		this.selectedPatientRow = "";
		this.selectedDoctorRow = "";
	}

	postScheduleService() {
		this.saveSuccess = false;
		this.saveError = false;
		this.saveErrorMessage = this.appConfig.generalErrorMsg;
		let apiurl = this.appConfig.uri_add_schedule;
		let pSchedule = {
			"doctor": this.selectedDoctorRow.data.id,
			"room": this.selectedRoomRow.data.id,
			"study": this.selectedStudyRow.data.id,
			"patient": this.selectedPatientRow.data.id
		  };
		this.scheduleService.postSchedules(apiurl, pSchedule).subscribe(
			data => {
				this.saveSuccess = true;
				this.saveError = false;
			},
			error => {
				this.saveError = true;
				this.saveSuccess = false;
				this.saveErrorMessage = this.appConfig.scheduleErrorMsg + JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
			});
		this.loader = false;
	}
}
