import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import {
  MdToolbarModule,
  MdSidenavModule,
  MdIconModule,
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdTableModule,
  MdDialogModule,
  MdTabsModule,
  MdSelectModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdCheckboxModule,
  MdChipsModule,
  MatListModule
} from '@angular/material';

// page
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './app-service.service';
import { DbService } from './db-service.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InterpreterComponent } from './interpreter/interpreter.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PatientComponent } from './patient/patient.component';
import { PatinetImportComponent } from './patient/patinet-import/patinet-import.component';
import { AssignWorkComponent, InterpreterDialogComponent } from './assign-work/assign-work.component';
import { SubmitWorkComponent, SubmitDialogComponent } from './submit-work/submit-work.component';
import { WorkStatusComponent, WorkCommentDialogComponent } from './work-status/work-status.component';
import { ReportMenuComponent } from './report-menu/report-menu.component';
import { ReportPatientListComponent } from './report-menu/report-patient-list/report-patient-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InterpreterComponent,
    InsuranceComponent,
    PatientComponent,
    PatinetImportComponent,
    AssignWorkComponent,
    InterpreterDialogComponent,
    SubmitWorkComponent,
    SubmitDialogComponent,
    WorkStatusComponent,
    WorkCommentDialogComponent,
    ReportMenuComponent,
    ReportPatientListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdTableModule,
    MdDialogModule,
    MdTabsModule,
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdCheckboxModule,
    MdChipsModule,
    MatListModule
    // CdkTableModule
  ],
  entryComponents: [
    InterpreterDialogComponent,
    SubmitDialogComponent,
    WorkCommentDialogComponent
  ],
  providers: [AppService, DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
