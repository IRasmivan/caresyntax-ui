import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AppConfig} from '../common/app.config';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRouting } from './schedule.routing';
import { ScheduleService } from './schedule.service';
import { CommonWebStorageService } from '../common/webstorage.utils';
import {TableModule} from 'primeng/table';
import { DoctorService } from '../doctor-page/doctor.service'
import { PatientService } from '../patient-page/patient.service'
import { StudyService } from '../study-page/study.service';
import { RoomService } from '../room-page/room.service';


@NgModule({
  imports: [ ScheduleRouting, CommonModule, FormsModule, TableModule],
  providers: [ScheduleService, CommonWebStorageService,AppConfig, DoctorService, PatientService, StudyService, RoomService],
  declarations: [ScheduleComponent ]
})
export class ScheduleModule {

}
