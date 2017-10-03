import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DbService } from '../db-service.service';

import { WorkStatus } from '../model/workStatus';
import { WorkStatusComment } from '../model/workStatusComment';

@Component({
  selector: 'app-work-status',
  templateUrl: './work-status.component.html',
  styleUrls: ['./work-status.component.css'],
  providers: [DatePipe]
})
export class WorkStatusComponent implements OnInit {
  subscription;

  workStatus: WorkStatus;

  currentDate: Date = new Date();

  constructor(
    private dbService: DbService,
    private datePipe: DatePipe,
    public dialog: MdDialog
  ) {

  }

  ngOnInit() {
    this.refreshData();
  }

  private refreshData() {
    // const objListWork = {
    //   UserName: this.appService.login.UserName,
    //   admitDate: this.currentDate
    //   admitDate: this.datepipe.transform(this.currentDate, 'yyyy-MM-dd')
    // };
    const date = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');

    this.subscription = this.dbService.getWorkStatus(date).subscribe((data) => {
      this.workStatus = data;
    });
  }

  openInterpreterDialog(data) {
    const dialogRef = this.dialog.open(WorkCommentDialogComponent, {
      data,
      width: '750px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshData();
    });
  }
}


// //////////////////////////////////////////////////////////

@Component({
  selector: 'app-work-comment-dialog',
  templateUrl: 'work-comment.component.html',
  styleUrls: ['./work-status.component.css'],
  providers: [DatePipe]
})
export class WorkCommentDialogComponent {
  subscription;

  workComment: Array<WorkStatusComment>;

  constructor(
    public dialogRef: MdDialogRef<WorkStatusComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private dbService: DbService,
    private datePipe: DatePipe
  ) {

    const objWorkStatus = {
      patientHN: this.data.patientHN,
      admitDate: this.datePipe.transform(this.data.assignDate, 'yyyy-MM-dd')
    };

    this.subscription = this.dbService.getShowComment(objWorkStatus).subscribe((res) => {
      this.workComment = res;
    });
  }
}
