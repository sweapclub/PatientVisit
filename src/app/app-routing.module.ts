import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { InterpreterComponent } from './interpreter/interpreter.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PatientComponent } from './patient/patient.component';
import { AssignWorkComponent } from './assign-work/assign-work.component';

// import { HomeComponent } from './home/home.component';

const routes = [
  // { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'interpreter', component: InterpreterComponent },
  { path: 'insurance', component: InsuranceComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'assignWork', component: AssignWorkComponent},
  { path: '**', redirectTo: '/' }
  // { path: 'Patient', component: PatientComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
