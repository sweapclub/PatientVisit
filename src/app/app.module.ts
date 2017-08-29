import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk';

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
  MdAutocompleteModule
} from '@angular/material';

// page
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './app-service.service';
import { DbService } from './db-service.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InterpreterComponent } from './interpreter/interpreter.component';
import { InsuranceComponent, InsuranceDialogComponent } from './insurance/insurance.component';
import { PatientComponent } from './patient/patient.component';
import { PatinetImportComponent, PatientDialogComponent } from './patient/patinet-import/patinet-import.component';
import { AssignWorkComponent } from './assign-work/assign-work.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InterpreterComponent,
    InsuranceComponent,
    InsuranceDialogComponent,
    PatientComponent,
    PatinetImportComponent,
    PatientDialogComponent,
    AssignWorkComponent
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
    MdAutocompleteModule,
    CdkTableModule
  ],
  entryComponents: [InsuranceDialogComponent, PatientDialogComponent],
  providers: [AppService, DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
