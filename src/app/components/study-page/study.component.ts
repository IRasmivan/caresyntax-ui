import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DataService } from '../common/common.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { StudyService } from './study.service'
import { AppConfig } from '../common/app.config';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'study',
	templateUrl: './study.component.html',
	styleUrls: ['./study-page.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class StudyComponent implements OnInit {

	private disableViewDataTable: boolean;
	private resultviewerror: boolean;
	private noStudy: boolean;
	private loader: boolean;
	private cols: any[];
	private dataMarts: any[];
	private first = 0;
	private isInit: boolean;
	private studyPageNo: any;
	private rowPerPage: any;
	private totalRecords: Number;
	private message: any;
	private saveSuccess: boolean;
	private saveError: boolean;
	private saveErrorMessage: any;
	private disableRefresh: boolean;
	private minDate: any;
	private patientId: any;
	private studyDescription: any;
	private status: any[];
	private studyStatusValue: any;
	public plannedStartTime: String;
	public estimatedEndTime: String;
	private disableUpdate: boolean;
	private saveErrorUpdate: boolean;
	private saveSuccessUpdate: boolean;
	private studyIdUpdate: any;
	private patientNameUpdate: any;
	private studyPatientIdUpdate: any;
	private descriptionUpdate: any;
	private statusValueUpdate: any;
	private plannedStartTimeUpdate: any;
	private estimatedEndTimeUpdate: any;
	private selectedRow: any;

	private patientName: any;
	private validatedPatientDetails: any;
	private disableSave: boolean;
	private dateTime: any;
	private productNameDescription: any;
	private productNameDescriptionUpdate: any;
	private version: any;



	// Constructor
	constructor(private dataservice: DataService,
		private calendar: NgbCalendar,
		private studyService: StudyService,
		private appConfig: AppConfig) {
		this.loader = true;
		this.rowPerPage = 6;
		this.disableViewDataTable = false
		this.noStudy = false;
		this.saveSuccess = false;
		this.saveError = false;
		this.disableRefresh = true;
		const current = new Date();
		this.minDate = {
			year: current.getFullYear(),
			month: current.getMonth() - 3,
			day: current.getDate()
		};
		this.status = ['Planned', 'In Progress', 'Finished'];
		this.studyStatusValue = 'Planned';
		this.disableUpdate = true;
		this.saveErrorUpdate = false;
		this.saveSuccessUpdate = false;
		this.disableSave = true;
		this.productNameDescription = "Click on validate button to validate the entered patient name";
		this.getStudyService(0);
	}

	// On page Load
	ngOnInit() {
		this.dataservice.dataObs$ = 'Study';
		this.dataservice.dataObsline2$ = 'View';
		this.loader = true;
		this.disableViewDataTable = true;
		this.cols = [
			{ field: 'id', header: 'Id', display: 'table-cell' },
			{ field: 'patientId', header: 'Patient Id', display: 'none' },
			{ field: 'patientName', header: 'Patient Name', display: 'table-cell' },
			{ field: 'description', header: 'Description', display: 'table-cell' },
			{ field: 'status', header: 'Status', display: 'table-cell' },
			{ field: 'plannedStartTime', header: 'Planned Start Time',display: 'table-cell' },
			{ field: 'estimatedEndTime', header: 'Estimated End Time',display: 'table-cell' },
			{ field: 'version', header: 'Version', display: 'none' },
		  ];
	}

	getStudyService(pageNo: any) {
		this.disableRefresh = false;
		this.disableUpdate = true;
		this.loader = true;
		this.resultviewerror = false;
		this.dataMarts = [];
		this.message = this.appConfig.generalErrorMsg;
		let apiurl = this.appConfig.uri_studys + '?pageNumber=' + pageNo + '&pageSize=' + this.rowPerPage;
		this.studyService.getStudy(apiurl).subscribe(
			data => {
				this.totalRecords = data.totalElements;
				if(this.totalRecords == 0) {
					this.disableViewDataTable = false;
					this.noStudy = true;
					this.disableRefresh = true;
				}
				else {
					this.disableViewDataTable = true;
					this.noStudy = false;
				}
				for(const study of data.content){
					this.dataMarts.push( 
						{
							'id': study.id, 
							'patientId' : study.patientId,
							'patientName' : study.patientName,
							'description' : study.description,
							'status' : study.status,
							'plannedStartTime': study.plannedStartTime,
							'estimatedEndTime': study.estimatedEndTime,
							'version': study.version
						}
					);
				}
				this.loader = false;
			},
			error => {
				this.resultviewerror = true;
				this.disableViewDataTable = false;
				this.message = JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
				
			});
		this.loader = false;
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
		this.getStudyService(this.studyPageNo);
	}

	onSubmit(studyAddForm){
		this.postStudyService();
	}

	postStudyService() {
		this.saveSuccess = false;
		this.saveError = false;
		this.saveErrorMessage = this.appConfig.generalErrorMsg;
		let apiurl = this.appConfig.uri_add_study;
		let patientId = this.validatedPatientDetails.id;
		let postStudy = {"patient": patientId,
							"description":  this.studyDescription,
							"status": this.studyStatusValue,
							"plannedStartTime":  this.plannedStartTime,
							"estimatedEndTime": this.estimatedEndTime
						};
						console.log(postStudy);
		this.studyService.postStudy(apiurl, postStudy).subscribe(
			data => {
				this.saveSuccess = true;
				this.saveError = false;
			},
			error => {
				this.saveError = true;
				this.saveSuccess = false;
				this.saveErrorMessage = this.appConfig.studyErrorMsg + JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
			});
		this.loader = false;
	}

	updateStudy(){
		console.log(this.selectedRow);
		this.saveSuccessUpdate = false;
		this.saveErrorUpdate = false;
		if(this.selectedRow !== undefined){
			this.studyIdUpdate = this.selectedRow.data.id;
			this.patientNameUpdate = this.selectedRow.data.patientName;
			this.studyPatientIdUpdate = this.selectedRow.data.patientId;
			this.descriptionUpdate = this.selectedRow.data.description;
			this.statusValueUpdate = this.selectedRow.data.status;
			this.plannedStartTimeUpdate = this.selectedRow.data.plannedStartTime;
			this.estimatedEndTimeUpdate = this.selectedRow.data.estimatedEndTime;		
			this.version =  this.selectedRow.data.version;	
			this.productNameDescriptionUpdate = 'Id: '+this.selectedRow.data.patientId + ', Name:' + this.selectedRow.data.patientName + ' -- Valid Patient';
		}
	}

	// TODO
	changePatientId(){
		this.saveSuccess = false;
		this.saveError = false;
	}

	clearPatentNameText(){
		this.patientName = "";
		this.productNameDescription = "Click on validate button to validate the entered patient name";
	}
	clearStudyStatus(){
		this.studyStatusValue = "Planned";
	}

	clearStudyDescription(){
		this.studyDescription = "";
	}


	clearPlannedStartTime(){
		this.plannedStartTime = null;
	}

	clearEstimateEndTime(){
		this.estimatedEndTime = null;
	}

	clearForm(){
		this.clearPatentNameText();
		this.clearStudyStatus();
		this.clearStudyDescription();
		this.clearPlannedStartTime();
		this.clearEstimateEndTime();
	}

	onRowSelect(select){
		this.disableUpdate = false;
		this.selectedRow = select;
		this.studyIdUpdate = this.selectedRow.data.id;
		this.studyPatientIdUpdate = this.selectedRow.data.patientId;
		this.descriptionUpdate = this.selectedRow.data.description;
		this.statusValueUpdate = this.selectedRow.data.status;
		this.plannedStartTimeUpdate = this.selectedRow.data.lannedStartTime;
		this.estimatedEndTimeUpdate = this.selectedRow.data.estimatedEndTime;
		
	}

	onRowUnselect(select){
		this.disableUpdate = true;
	}


	onSubmitForUpdated(studyUpdateForm: any){
		console.log("this is updated");
		this.putStudyService(studyUpdateForm);
	}

	changeStudyPatientIdUpdate(){
		this.saveErrorUpdate = false;
		this.saveSuccessUpdate = false;
	}

	

	clearPatentNameUpdate(){
		this.patientNameUpdate = "";
		this.productNameDescriptionUpdate = "Click on validate button to validate the entered patient name";
	}

	clearStudyDescriptionUpdate(){
		this.descriptionUpdate = "";
	}

	clearStudyStatusUpdate(){
		this.statusValueUpdate = "Planned";
	}
	clearStudyPlannedStartTimeUpdate(){
		this.plannedStartTimeUpdate = null;
	}

	clearStudyEstimateEndTime(){
		this.estimatedEndTimeUpdate = null;
	}

	clearFormUpdate(){
		this.clearPatentNameUpdate();
		this.clearStudyDescriptionUpdate();
		this.clearStudyStatusUpdate();
		this.clearStudyPlannedStartTimeUpdate();
		this.clearStudyEstimateEndTime();
	}

	putStudyService(studyUpdateForm: any) {
		this.saveSuccessUpdate = false;
		this.saveErrorUpdate = false;
		this.saveErrorMessage = this.appConfig.generalErrorMsg;
		let apiurl = this.appConfig.uri_update_study;

		// Madhu
		let postStudy = {
							"id": this.studyIdUpdate,
							"patient": this.studyPatientIdUpdate,
							"description":  this.descriptionUpdate,
							"status": this.statusValueUpdate,
							"plannedStartTime":  this.plannedStartTimeUpdate,
							"estimatedEndTime": this.estimatedEndTimeUpdate,
							"version": this.version
						};
		console.log(postStudy);
		this.studyService.putStudy(apiurl, postStudy).subscribe(
			data => {
				this.saveSuccessUpdate = true;
				this.saveErrorUpdate = false;
				console.log(data);
			},
			error => {
				this.saveErrorUpdate = true;
				this.saveSuccessUpdate = false;
				this.saveErrorMessage = this.appConfig.studyErrorMsg + JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
			});
		this.loader = false;
	}

	
	getPatientDetails(){
		this.validatedPatientDetails = null;
		this.disableSave= true;
		if(this.patientName !== undefined){
			let apiurl = this.appConfig.uri_patient_name + '?patientName=' + this.patientName;
			this.studyService.getStudy(apiurl).subscribe(
				data => {
					this.validatedPatientDetails = data;
					this.productNameDescription = 'Id: '+ this.validatedPatientDetails.id + ', Name:' +  this.validatedPatientDetails.name + ' -- Valid Patient';
					this.disableSave = false;
				},
				error => {
					this.productNameDescription = JSON.parse(error._body).message;
				});
		}


		if(this.patientNameUpdate !== undefined){
			let apiurl = this.appConfig.uri_patient_name + '?patientName=' + this.patientNameUpdate;
			this.studyService.getStudy(apiurl).subscribe(
				data => {
					this.validatedPatientDetails = data;
					this.productNameDescriptionUpdate = 'Id: '+ this.validatedPatientDetails.id + ', Name:' +  this.validatedPatientDetails.name + ' -- Valid Patient';
					this.disableSave = false;
				},
				error => {
					this.productNameDescription = JSON.parse(error._body).message;
				});
		}

		
	}


	converToUTC(serverDate) {
		if(serverDate !== undefined || serverDate != ''){
			return (new Date(serverDate.toString().split('GMT')[0]+' UTC').toISOString());
		}
	}

	setPlannedStartTime(owlDateTime) {
		this.plannedStartTime = this.converToUTC(owlDateTime.value);
	}


	setEstimatedEndTime(owlDateTime) {
		this.estimatedEndTime = this.converToUTC(owlDateTime.value);
	}


	setPlannedStartTimeUpdate(owlDateTime) {
		this.plannedStartTimeUpdate = this.converToUTC(owlDateTime.value);
	}


	setEstimatedEndTimeUpdate(owlDateTime) {
		this.estimatedEndTimeUpdate = this.converToUTC(owlDateTime.value);
	}

}
