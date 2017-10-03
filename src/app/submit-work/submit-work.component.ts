import { Component, Inject, OnInit } from '@angular/core';
import { DbService } from '../db-service.service';
import { AppService } from '../app-service.service';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ListWork } from '../model/listWork';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-submit-work',
  templateUrl: './submit-work.component.html',
  styleUrls: ['./submit-work.component.css'],
  providers: [DatePipe]
})
export class SubmitWorkComponent implements OnInit {
  subscription;
  listWorks: ListWork;

  currentDate = new Date();
  constructor(
    private dbService: DbService,
    private appService: AppService,
    private datepipe: DatePipe,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.refreshData();
  }

  private refreshData() {
    const objListWork = {
      UserName: this.appService.login.UserName,
      // admitDate: this.currentDate
      admitDate: this.datepipe.transform(this.currentDate, 'yyyy-MM-dd')
    };

    this.subscription = this.dbService.getListWork(objListWork).subscribe((data) => {
      this.listWorks = data;
    });
  }


  openInterpreterDialog(data) {
    const dialogRef = this.dialog.open(SubmitDialogComponent, {
      data,
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshData();
    });
  }
}

// //////////////////////////////////////////
@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-work.component.css'],
  providers: [DatePipe]
})
export class SubmitDialogComponent {
  subscription;
  // comment: String;
  visaInformation: String;
  statusOfPatient: String;
  complaint: String;
  request: String;
  reportManager: Boolean = false;

  constructor(public dialogRef: MdDialogRef<SubmitWorkComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private dbService: DbService,
    private datePipe: DatePipe
  ) {
    this.visaInformation = data.visaInformation; // console.log(data);
    this.statusOfPatient = data.statusOfPatient;
    this.complaint = data.complaint;
    this.request = data.request;
    this.reportManager = data.reportManager;

    // if (data.reportManager === 1) {
    //   this.reportManager = true;
    // }
  }

  updateWork(objForm) {
    // console.log(objForm.value);

    if (objForm.value.comment === '') {
      return;
    }

    const objUpdate = {
      // finishedFlg: objForm.value.workFlg,
      // comment: objForm.value.comment,
      // admitDate: this.datePipe.transform(this.data.assignDate, 'yyyy-MM-dd'),
      // patientHN: this.data.patientHN

      admitDate: this.datePipe.transform(this.data.assignDate, 'yyyy-MM-dd'),
      patientHN: this.data.patientHN,
      reportManager: (objForm.value.reportFlg === true) ? '1' : '0',
      visaInformation: objForm.value.visaInformation,
      statusOfPatient: objForm.value.statusOfPatient,
      complaint: objForm.value.complaint,
      request: objForm.value.request

    };

// ??    console.log(objUpdate);

    this.subscription = this.dbService.postUpdateWork(objUpdate).subscribe(() => {
      this.dialogRef.close();
    });

  }


}
