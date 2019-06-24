import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../common/common.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { PatientService } from './patient.service'
import {AppConfig } from '../common/app.config';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'patient',
	templateUrl: './patient.component.html',
	styleUrls: ['./patient-page.component.css']
})

export class PatientComponent implements OnInit {

	private disableViewDataTable: boolean;
	private resultviewerror: boolean;
	private noPatient: boolean;
	private loader: boolean;
	private cols: any[];
	private dataMarts: any[];
	private first = 0;
	private isInit: boolean;
	private patientPageNo: any;
	private rowPerPage: any;
	private totalRecords: Number;
	private message: any;
	private saveSuccess: boolean;
	private saveError: boolean;
	private saveErrorMessage: any;
	private disableRefresh: boolean;
	private maxDate: any;
	private patientName: any;
	private patentSex: any[];
	private patentSexValue: any;
	private patientDob: any;
	private disableUpdate: boolean;
	private saveErrorUpdate: boolean;
	private saveSuccessUpdate: boolean;
	private patientIdUpdate: any;
	private patientNameUpdate: any;
	private patentSexValueUpdate: any;
	private patientDobUpdate: any;
	private selectedRow: any;


	// Constructor
	constructor(private dataservice: DataService,
		private calendar: NgbCalendar,
		private patientService: PatientService,
		private appConfig: AppConfig) {
		this.loader = true;
		this.rowPerPage = 6;
		this.disableViewDataTable = false
		this.noPatient = false;
		this.saveSuccess = false;
		this.saveError = false;
		this.disableRefresh = true;
		const current = new Date();
		this.maxDate = {
			year: current.getFullYear(),
			month: current.getMonth() + 1,
			day: current.getDate()
		};
		this.patentSex = ['', 'M', 'F', 'O'];
		this.disableUpdate = true;
		this.saveErrorUpdate = false;
		this.saveSuccessUpdate = false;
		
	}

	// On page Load
	ngOnInit() {
		this.dataservice.dataObs$ = 'Patient';
		this.dataservice.dataObsline2$ = 'View';
		this.loader = true;
		this.disableViewDataTable = true;
		this.cols = [
			{ field: 'id', header: 'Id' },
			{ field: 'patientName', header: 'Patient Name' },
			{ field: 'sex', header: 'Sex' },
			{ field: 'dateOfBirth', header: 'Date of Birth' }
		  ];
	}

	getPatientService(pageNo: any) {
		this.disableRefresh = false;
		this.disableUpdate = true;
		this.loader = true;
		this.resultviewerror = false;
		this.dataMarts = [];
		this.message = this.appConfig.generalErrorMsg;
		let apiurl = this.appConfig.uri_patients + '?pageNumber=' + pageNo + '&pageSize=' + this.rowPerPage;
		this.patientService.getPatient(apiurl).subscribe(
			data => {
				this.totalRecords = data.totalElements;
				if(this.totalRecords == 0) {
					this.disableViewDataTable = false;
					this.noPatient = true;
					this.disableRefresh = true;
				}
				else {
					this.disableViewDataTable = true;
					this.noPatient = false;
				}
				for(const patient of data.content){
					this.dataMarts.push( 
						{
							'id': patient.id, 
							'patientName' : patient.name,
							'sex' : patient.sex,
							'dateOfBirth' : patient.dateOfBirth == null ? null : patient.dateOfBirth.substring(0,10)
						}
					);
				}
			},
			error => {
				this.resultviewerror = true;
				this.disableViewDataTable = false;
				this.message = JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
				
			});
		this.loader = false;
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

	onSubmit(patientAddForm){
		this.postPatientService(patientAddForm);

	}

	postPatientService(patientAddForm: any) {
		this.saveSuccess = false;
		this.saveError = false;
		this.saveErrorMessage = this.appConfig.generalErrorMsg;
		let apiurl = this.appConfig.uri_add_patient;
		let dob = this.patientDob.year + '-' + ('0'+ this.patientDob.month).slice(-2)  + '-' + ('0'+this.patientDob.day).slice(-2) + 'T00:00:00.000Z';
		let postPatient = {"name": patientAddForm.value.patientName,
							"sex":  this.patentSexValue,
							"dateOfBirth": dob};
		this.patientService.postPatient(apiurl, postPatient).subscribe(
			data => {
				this.saveSuccess = true;
				this.saveError = false;
			},
			error => {
				this.saveError = true;
				this.saveSuccess = false;
				this.saveErrorMessage = this.appConfig.patientErrorMsg + JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
			});
		this.loader = false;
	}

	updatePatient(){
		if(this.selectedRow !== undefined){
			this.patientIdUpdate = this.selectedRow.data.id;
			this.patientNameUpdate = this.selectedRow.data.patientName;
			this.patentSexValueUpdate = this.selectedRow.data.sex;
			if(this.selectedRow.data.dateOfBirth.length > 10){
				let dateDetails = this.selectedRow.data.dateOfBirth.substring(0,10).split('-')
				this.patientDobUpdate = {
										year: parseInt(dateDetails[0]),
										month: parseInt(dateDetails[1]),
										day: parseInt(dateDetails[2])
										}
			}
		}
	}

	changePatientName(){
		this.saveSuccess = false;
		this.saveError = false;
	}

	clearPatentNameText(){
		this.patientName = "";
	}
	clearPatentSex(){
		this.patentSexValue = "";
	}

	clearPatientDob(){
		this.patientDob = "";
	}

	clearForm(){
		this.clearPatentNameText();
		this.clearPatentSex();
		this.clearPatientDob();
	}

	onRowSelect(select){
		this.disableUpdate = false;
		this.selectedRow = select;
		this.patientIdUpdate = this.selectedRow.data.id;
		this.patientNameUpdate = this.selectedRow.data.patientName;
		this.patentSexValueUpdate = this.selectedRow.data.sex;
		this.patientDobUpdate = this.selectedRow.data.dateOfBirth;
	}

	onRowUnselect(select){
		this.disableUpdate = true;
	}


	onSubmitForUpdated(patientUpdateForm: any){
		console.log("this is updated");
		this.putPatientService(patientUpdateForm);
	}

	changePatientNameUpdate(){
		this.saveErrorUpdate = false;
		this.saveSuccessUpdate = false;
	}

	clearPatentNameUpdateText(){
		this.patientNameUpdate = "";
	}

	clearPatentSexUpdate(){
		this.patentSexValueUpdate = "";
	}

	clearPatientDobUpdate(){
		this.patientDobUpdate = "";
	}

	clearFormUpdate(){
		this.clearPatentNameUpdateText();
		this.clearPatentSexUpdate();
		this.clearPatientDobUpdate();
	}

	putPatientService(patientUpdateForm: any) {
		this.saveSuccessUpdate = false;
		this.saveErrorUpdate = false;
		this.saveErrorMessage = this.appConfig.generalErrorMsg;
		let apiurl = this.appConfig.uri_update_patient;
		let dob;
		if(this.patientDobUpdate != null){
			dob = this.patientDobUpdate.year + '-' + ('0'+ this.patientDobUpdate.month).slice(-2)  + '-' + ('0'+this.patientDobUpdate.day).slice(-2) + 'T00:00:00.000Z';
		}		
		let postPatient = {
							"id": this.patientIdUpdate,
							"name": this.patientNameUpdate,
							"sex":  this.patentSexValueUpdate,
							"dateOfBirth": dob
						};
		console.log(postPatient);
		this.patientService.putPatient(apiurl, postPatient).subscribe(
			data => {
				this.saveSuccessUpdate = true;
				this.saveErrorUpdate = false;
				console.log(data);
			},
			error => {
				this.saveErrorUpdate = true;
				this.saveSuccessUpdate = false;
				this.saveErrorMessage = this.appConfig.patientErrorMsg + JSON.parse(error._body).error + ' - ' + JSON.parse(error._body).message;
			});
		this.loader = false;
	}

}
