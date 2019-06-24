import { TestBed, async } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { ComponentFixtureAutoDetect,inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CommonHttpService } from './../common/app.httpservice';
import { AppConfig } from '../common/app.config';
import { CommonWebStorageService } from '../common/webstorage.utils';
import { CommonWebStorageServiceMock } from '../common/webstorage.mock';
import {APP_BASE_HREF} from '@angular/common';

describe('Footer Component Validation', () => {

  let commonWebStorageService = new CommonWebStorageServiceMock();
  beforeEach(async(() => {
    
   TestBed.configureTestingModule({
		imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterTestingModule
  ],
  declarations: [
    FooterComponent
  ],
  providers: [
      {provide: APP_BASE_HREF, useValue : '/' },
      { provide: ComponentFixtureAutoDetect, useValue: true },
      { provide: CommonWebStorageService, useValue: commonWebStorageService }
    ]
    }).compileComponents();
  }));

 
  it(`should create the FooterComponent'`, async(() => {
    const fixture = TestBed.createComponent(FooterComponent);
    const app = fixture.debugElement.componentInstance;
    commonWebStorageService = fixture.debugElement.injector.get(CommonWebStorageService);
    // Setup spy on the `getQuote` method

    spyOn(commonWebStorageService, 'getSessionStorage')
          .and.returnValue('Product');

    expect(app).toBeTruthy();
  }));

  it(`should have "copyright" text in Footer'`, async(() => {
    const fixture = TestBed.createComponent(FooterComponent);
    const app = fixture.debugElement.componentInstance;
    const element = fixture.nativeElement;         
    const component = fixture.componentInstance;  
    expect(element.querySelector('p').innerHTML).toBeTruthy();
  }));

});