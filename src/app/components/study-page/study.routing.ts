import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudyComponent } from './study.component';

const routes: Routes = [
  { path: '', component: StudyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudyRouting {} //: ModuleWithProviders = RouterModule.forChild(routes);