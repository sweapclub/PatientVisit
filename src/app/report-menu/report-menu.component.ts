import { Component, OnInit, Inject } from '@angular/core';

import { AppService } from '../app-service.service';
import { DbService } from '../db-service.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-report-menu',
  templateUrl: './report-menu.component.html',
  styleUrls: ['./report-menu.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class ReportMenuComponent implements OnInit {
  linkReport = [
    { name: 'Patient List', path: '/reportPatientList' },
    { name: 'Morning Brief', path: '/report' },
    { name: `Interpreter's Patient (Short)`, path: '/report' },
    { name: `Interpreter's Patient (Long)`, path: '/report' },
    { name: 'Visa Report', path: '/report' },
    { name: 'Management Report', path: '/report' }
  ];

  mainFlg: Boolean = true;

  ngOnInit() {
  }

  constructor(
    @Inject('Window') private window: Window,
    private appService: AppService
  ) {
  }

  redirect(path: String) {
    this.appService.navigateUrl(path);
    this.mainFlg = false;
  }

  download() {
    const doc = new jsPDF();

    doc.setFontSize(26);

    for (let i = 1; i <= 30; i++) {
      doc.text(20, i * 10, `line :${i}`);
    }

    doc.addPage();
    doc.text(20, 20, 'Do you like that?');
    // Save the PDF
    doc.save('Test.pdf');
  }

}
