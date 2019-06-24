import { TestBed, async } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { ComponentFixtureAutoDetect,inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';


import {APP_BASE_HREF} from '@angular/common';

describe('Landing Page Validation', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
		imports: [
    BrowserModule,

    HttpModule,
    FormsModule,
    RouterTestingModule
  ],
  declarations: [
  
    LandingPageComponent
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
    { provide: ComponentFixtureAutoDetect, useValue: true }
  ]
		
    }).compileComponents();
  }));

  it(`should create the LandingPageComponent'`, async(() => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
 it(`should have "welcome" text in landing page'`, async(() => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const app = fixture.debugElement.componentInstance;
    const element = fixture.nativeElement;         
    const component = fixture.componentInstance;  
    expect(element.querySelector("[id='welcomeheader']").innerHTML.trim()).toBe('Welcome');
  }));

   it(`should have "Foods Master data" heading in landing page'`, async(() => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const app = fixture.debugElement.componentInstance;
    const element = fixture.nativeElement;         
    const component = fixture.componentInstance;  
    expect(element.querySelector("[id='pageheader']").innerHTML.trim()).toBe('Foods Master Data');
  }));

   it(`should have "portal" text in landing page'`, async(() => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const app = fixture.debugElement.componentInstance;
    const element = fixture.nativeElement;         
    const component = fixture.componentInstance;  
    expect(element.querySelector('p').innerHTML.trim()).toBe('Portal');
  }));
  
});