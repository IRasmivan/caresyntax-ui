import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AppConfig} from '../common/app.config';
import { RoomComponent } from './room.component';
import { RoomRouting } from './room.routing';
import { RoomService } from './room.service';
import { CommonWebStorageService } from '../common/webstorage.utils';
import {TableModule} from 'primeng/table';


@NgModule({
  imports: [ RoomRouting, CommonModule, FormsModule, TableModule],
  providers: [RoomService, CommonWebStorageService,AppConfig],
  declarations: [RoomComponent ]
})
export class RoomModule {

}
