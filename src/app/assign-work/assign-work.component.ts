import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgModule } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';

// import { AppService, ServiceDataSource } from '../app-service.service';
import { AppService } from '../app-service.service';
import { DbService } from '../db-service.service';
import { AssignWorkCurrent } from '../model/assignWorkCurrent';


import { InterpreterAvailable } from '../model/interpreterAvailable';

@Component({
  selector: 'app-assign-work',
  templateUrl: './assign-work.component.html',
  styleUrls: ['./assign-work.component.css']
})
export class AssignWorkComponent implements OnInit, OnDestroy {

  assignTable: AssignWorkCurrent[];
  sstTable;
  sstOparation;
  sstInterpreter;

  constructor(public dialog: MdDialog, private dbService: DbService, private appService: AppService) {
  }

  ngOnInit() {

    this.refreshTable();

  }

  ngOnDestroy() {
    this.sstTable.unsubscribe();
  }

  openInterpreterDialog(data) {
    const dialogRef = this.dialog.open(InterpreterDialogComponent, {
      data,
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable();
    });
  }

  private refreshTable() {
    this.sstTable = this.dbService.getAssignWorkCurrent().subscribe((res) => {
    // this.sstTable = this.dbService.getCurrentInWard().subscribe((res) => {
      this.assignTable = res;
      // console.log(res);
    });
  }
}


// ////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-assign-work-dialog',
  templateUrl: './interpreter-dialog.component.html',
  styleUrls: ['./assign-work.component.css'],
  providers: [DatePipe]
})
export class InterpreterDialogComponent implements OnInit {
  subscription;
  // interpreters: InterpreterStatus;
  interpreterTable: InterpreterAvailable[];
  interpreterFilter: InterpreterAvailable[];

  constructor(public dialogRef: MdDialogRef<AssignWorkComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private dbService: DbService,
    private datePipe: DatePipe) {
  }

  filterInterpreter(name: string) {
    if (name && name.trim() !== '') {
      this.interpreterFilter = this.interpreterTable.filter((interpreter: InterpreterAvailable) => {
        return (interpreter.FullName.toLowerCase().indexOf(name.toLowerCase()) > -1);
      })
    } else {
      this.interpreterFilter = this.interpreterTable;
    }

  }

  ngOnInit() {

    this.subscription = this.dbService.getInterpreterAvailable().subscribe(data => {
      if (data.length !== 0) {
        this.interpreterTable = data;
        this.interpreterFilter = data;
        console.log(data);
      }
    })
  }

  selectedInterpreter(obj) {
    const objtoDB = {
      admitDate: this.datePipe.transform(this.data.assignDate, 'yyyy-MM-dd'),
      patientHN: this.data.patientHN,
      interpreterID: obj.UserName
    }

    this.dbService.postAssignInterpreter(objtoDB).subscribe();
    this.dialogRef.close();
  }
}
