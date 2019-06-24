import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AppConfig} from '../common/app.config';
import { DoctorComponent } from './doctor.component';
import { DoctorRouting } from './doctor.routing';
import { DoctorService } from './doctor.service';
import { CommonWebStorageService } from '../common/webstorage.utils';
import {TableModule} from 'primeng/table';


@NgModule({
  imports: [ DoctorRouting, CommonModule, FormsModule, TableModule],
  providers: [DoctorService, CommonWebStorageService,AppConfig],
  declarations: [DoctorComponent ]
})
export class DoctorModule {

}
