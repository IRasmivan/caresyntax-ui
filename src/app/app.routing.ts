import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from  './components/landing-page/landing-page.component';


const routes: Routes = [
    { path: 'root', component: AppComponent },
    { path: 'menuPage', loadChildren: () => import('./components/menu-page/menu-page.module').then(m => m.MenuPageModule) },
    { path: 'doctor', loadChildren: () => import('./components/doctor-page/doctor.module').then(m => m.DoctorModule) },
    { path: 'patient', loadChildren: () => import('./components/patient-page/patient.module').then(m => m.PatientModule) },
    { path: 'study', loadChildren: () => import('./components/study-page/study.module').then(m => m.StudyModule) },
    { path: 'room', loadChildren: () => import('./components/room-page/room.module').then(m => m.RoomModule) },
    { path: 'schedule', loadChildren: () => import('./components/schedule-page/schedule.module').then(m => m.ScheduleModule) },
    { path: '**', component: LandingPageComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
export class routing {}
//export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
