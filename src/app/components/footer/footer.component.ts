import { Component, OnInit } from '@angular/core';
import { CommonWebStorageService } from '../common/webstorage.utils';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'mtp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {

  constructor(
    public localSessionService : CommonWebStorageService,
    location: PlatformLocation,
    private router : Router){
  }

  public ngDoCheck() {
      
    }
}