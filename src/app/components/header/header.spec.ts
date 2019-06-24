import { TestBed, async } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ComponentFixtureAutoDetect,inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CommonHttpService } from './../common/app.httpservice';
import { AppConfig } from '../common/app.config';
import { CommonWebStorageService } from '../common/webstorage.utils';
import { DataService } from '../common/common.service';
import {APP_BASE_HREF} from '@angular/common';

describe('Header Component Validation', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
		imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterTestingModule
  ],
  declarations: [
  
    HeaderComponent
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
    CommonHttpService,
    CommonWebStorageService,
    AppConfig,
    DataService,
    { provide: ComponentFixtureAutoDetect, useValue: true }
  ]
		
    }).compileComponents();
  }));

  it(`should create the HeaderComponent'`, async(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have "login" text in Header'`, async(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    const element = fixture.nativeElement;         
    const component = fixture.componentInstance;  
    expect(element.querySelector("[id='login']").innerHTML).toContain('LOGIN');
  }));
 

});