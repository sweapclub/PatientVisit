import { Component, OnInit } from '@angular/core';
import { AppService } from './app-service.service';
import { DbService } from './db-service.service';

import { Login } from './model/login';
import { ReportMenuComponent } from './report-menu/report-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Assign Work Interpreter';
  links = [
    { name: 'Home', path: 'Home' },
    { name: 'Interpreter Status', path: 'interpreter' },
    { name: 'Insurance Company', path: 'insurance' },
    { name: 'Patient Info', path: 'patient' },
    { name: 'Assign Work', path: 'assignWork' },
    { name: 'Submit Work', path: 'submitWork' },
    { name: 'Work Status', path: 'workStatus' },
    { name: 'Report', path: '/report' }
  ];
  disabledNav = true;
  // loginName: String = '';
  login: Login;

  constructor(private appService: AppService, private dbService: DbService) {

  }

  ngOnInit() {
    this.load8amOnWard();

    this.disabledNav = this.appService.checkLogin();
    this.login = this.appService.getLoginCookie();
    let cookie = this.login;

    this.appService.loginChanged.subscribe(
      () => {
        cookie = this.appService.getLoginCookie();
        if (cookie) {
          this.login = cookie;
        }
        this.disabledNav = this.appService.checkLogin();
      }
    );
  }

  logOut() {
    this.login = this.appService.deleteLoginCookie();
    this.disabledNav = this.appService.checkLogin();
  }

  load8amOnWard() {
    let subCheck;
    let subData;
    let subImport;
    subCheck = this.dbService.getAssignWorkCurrent().subscribe((dataCheck) => {
      if (!dataCheck.length) {
        subData = this.dbService.getCurrentInWard().subscribe((dataTK) => {
          subImport = this.dbService.postImport(dataTK).subscribe();
        });
      }
    });
  }
}

// @Component({
//   selector: 'app-report',
//   templateUrl: 'report.component.html',
//   styleUrls: ['./report.component.css']
// })
// export class ReportComponent {
//   constructor(private appService: AppService
//   ) {
//     this.appService.checkLogin();
//     console.log('WHY !');
//   }
//   // download() {
//   //   const doc = new jsPDF();
//   //   doc.text(20, 20, 'Hello world!');
//   //   doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
//   //   doc.addPage();
//   //   doc.text(20, 20, 'Do you like that?');
//   //   // Save the PDF
//   //   doc.save('Test.pdf');
//   // }
// }
