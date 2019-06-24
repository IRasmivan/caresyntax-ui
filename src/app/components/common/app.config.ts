import { Injectable } from '@angular/core';
import {environment } from '../../../environments/environment';

@Injectable()
export class AppConfig {
    public serverApiUrl = environment.apiUrl;

    public uri_doctors = this.serverApiUrl + "/caresyntax/api/v1/doctors";
    public uri_add_doctors = this.serverApiUrl + "/caresyntax/api/v1/doctor/add";
    public uri_patients = this.serverApiUrl + "/caresyntax/api/v1/patients";
    public uri_patient_name = this.serverApiUrl + "/caresyntax/api/v1/patient";
    public uri_add_patient = this.serverApiUrl + "/caresyntax/api/v1/patient/add";
    public uri_update_patient = this.serverApiUrl + "/caresyntax/api/v1/patient/update";
    public uri_studys = this.serverApiUrl + "/caresyntax/api/v1/studys";
    public uri_study_by_patient = this.serverApiUrl + "/caresyntax/api/v1/studyByPatientName";
    public uri_add_study = this.serverApiUrl + "/caresyntax/api/v1/study/add";
    public uri_update_study = this.serverApiUrl + "/caresyntax/api/v1/study/update";
    public uri_rooms = this.serverApiUrl + "/caresyntax/api/v1/rooms";
    public uri_add_room = this.serverApiUrl + "/caresyntax/api/v1/room/add";
    public uri_schedules  = this.serverApiUrl + "/caresyntax/api/v1/schedule";
    public uri_add_schedule = this.serverApiUrl + "/caresyntax/api/v1/schedule/add";



    // Message Constants
    public generalErrorMsg = "It looks linke you are not connected to service, Please check and retry!!";

    public doctorErrorMsg = "The Doctor details is not saved, Error :: ";
    public patientErrorMsg = "The Patient details is not saved, Error :: ";
    public studyErrorMsg = "The Study details is not saved, Error :: ";
    public scheduleErrorMsg = "The Schedule details is not saved, Error :: ";
}
