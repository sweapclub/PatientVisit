import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgModule } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { AppService, ServiceDataSource } from '../app-service.service';

@Component({
  selector: 'app-assign-work',
  templateUrl: './assign-work.component.html',
  styleUrls: ['./assign-work.component.css']
})
export class AssignWorkComponent implements OnInit, OnDestroy {

  displayedColumns = ['patientHN', 'patientName', 'patientAge', 'nationality', 'admitWard', 'admitRoom', 'interpreter', 'Edit'];
  dataSource: ServiceDataSource | null;
  @ViewChild('filter') filter: ElementRef;

  sstTable;
  sstOparation;
  constructor(public dialog: MdDialog, private appService: AppService) {
    this.appService.getAssignWorkCurrent();
  }

  ngOnInit() {

    this.sstTable = this.appService.assignWorkCurrentSuccess.subscribe(
      () => {
        this.dataSource = this.appService.assignWorkCurrent;
      }
    );


  }

  ngOnDestroy() {
    this.sstTable.unsubscribe();
  }
}
