import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CommonHttpService } from './components/common/app.httpservice';
import { AppConfig } from './components/common/app.config';
import { CommonWebStorageService } from './components/common/webstorage.utils';
import { CommonErrorHandler } from './components/exception/exception.handler';
import { CommonErrorModule } from './components/exception/exception.module';
import { DataService } from './components/common/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonErrorModule,
    FormsModule,
    NgbModule,
    routing,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent
  ],
  providers: [
    CommonHttpService,
    AppConfig,
    CommonWebStorageService,
    CommonErrorHandler,
    CommonErrorModule,
	DataService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
