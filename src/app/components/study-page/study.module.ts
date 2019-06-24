import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AppConfig} from '../common/app.config';
import { StudyComponent } from './study.component';
import { StudyRouting } from './study.routing';
import { StudyService } from './study.service';
import { CommonWebStorageService } from '../common/webstorage.utils';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  imports: [ StudyRouting, CommonModule, FormsModule, TableModule, NgbModule, OwlDateTimeModule, OwlNativeDateTimeModule
   ],
  providers: [StudyService, CommonWebStorageService, AppConfig],
  declarations: [StudyComponent ]
})
export class StudyModule {

}
