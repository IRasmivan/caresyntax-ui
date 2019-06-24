import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AppConfig} from './../common/app.config';
import { MenuPageComponent } from './menu-page.component';
import { MenuPageRouting } from './menu-page.routing';
import { CommonWebStorageService } from './../common/webstorage.utils';
import { MenuPageService } from './menu-page.service';


@NgModule({
  imports: [ MenuPageRouting, CommonModule, FormsModule],
  providers: [MenuPageService, CommonWebStorageService,AppConfig],
  declarations: [MenuPageComponent]
})
export class MenuPageModule { }