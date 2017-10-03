import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { InterpreterComponent } from './interpreter/interpreter.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PatientComponent } from './patient/patient.component';
import { AssignWorkComponent } from './assign-work/assign-work.component';
import { SubmitWorkComponent } from './submit-work/submit-work.component';
import { WorkStatusComponent } from './work-status/work-status.component';
import { ReportMenuComponent } from './report-menu/report-menu.component';

import { ReportPatientListComponent } from './report-menu/report-patient-list/report-patient-list.component';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'interpreter', component: InterpreterComponent },
  { path: 'insurance', component: InsuranceComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'assignWork', component: AssignWorkComponent },
  { path: 'submitWork', component: SubmitWorkComponent },
  { path: 'workStatus', component: WorkStatusComponent },
  { path: 'report', component: ReportMenuComponent},
  { path: 'reportPatientList', component: ReportPatientListComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
