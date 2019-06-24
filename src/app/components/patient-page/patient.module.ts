import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AppConfig} from '../common/app.config';
import { PatientComponent } from './patient.component';
import { PatientRouting } from './patient.routing';
import { PatientService } from './patient.service';
import { CommonWebStorageService } from '../common/webstorage.utils';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [ PatientRouting, CommonModule, FormsModule, TableModule, NgbModule],
  providers: [PatientService, CommonWebStorageService, AppConfig],
  declarations: [PatientComponent ]
})
export class PatientModule {

}
