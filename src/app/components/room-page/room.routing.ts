import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomComponent } from './room.component';

const routes: Routes = [
  { path: '', component: RoomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoomRouting {} //: ModuleWithProviders = RouterModule.forChild(routes);