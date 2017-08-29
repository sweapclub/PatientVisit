import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AppService, ServiceDataSource, ServiceDatabase } from '../../app-service.service';
@Component({
  selector: 'app-patinet-import',
  templateUrl: './patinet-import.component.html',
  styleUrls: ['./patinet-import.component.css']
})
export class PatinetImportComponent implements OnInit {
  displayedColumns = ['HN', 'FullName', 'Age', 'Nationality', 'Insurance', 'EditInsurance'];
  dataSource: ServiceDataSource | null;
  subscription;

  constructor(public dialog: MdDialog, private appService: AppService) {
    this.appService.getPatientImport();
    this.appService.getInsuranceList();
  }

  ngOnInit() {
    this.subscription = this.appService.patientImportSuccess.subscribe(
      () => {
        this.dataSource = this.appService.patientImport;
      }
    );
  }

  openInsuranceDialog(data) {
    const dialogRef = this.dialog.open(PatientDialogComponent, { data });
    dialogRef.afterClosed().subscribe(() => {
      this.appService.getPatientImport();
    });
  }

  importPatient() {

  }
}

// ////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-patient-dialog',
  templateUrl: '../patinet-dialog.component.html',
  styleUrls: ['./patinet-import.component.css']
})
export class PatientDialogComponent implements OnInit {
  insuranceCompany: ServiceDataSource | null;
  subscription;
  displayedColumns = ['Name', 'Nationality', 'Selected'];
  dataSource: ServiceDataSource | null;
  @ViewChild('filter') filter: ElementRef;

  // @ViewChild('filter') filter: ElementRef;
  constructor(public dialogRef: MdDialogRef<PatientDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private appService: AppService) {
    this.appService.getInsuranceList();
    console.log(data);

  }

  ngOnInit() {
    this.dataSource = this.appService.insuranceList;
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  selectedInsurance(obj) {
    const objMatch = {
      insuranceName: obj.ins_name,
      patientHN: this.data.patientHN
    }

    let needUpdateFlg = false;

    if (this.data.alreadyInserted === 1) {
      // tslint:disable-next-line:triple-equals
      if (this.data.insuranceName != objMatch.insuranceName) {
        needUpdateFlg = true;
      }
    }

    if (this.data.alreadyInserted === 0) {
      if (objMatch.insuranceName === '') {
        this.dialogRef.close();
      }
      this.appService.postMatchInsurance(objMatch);

    } else if (this.data.alreadyInserted === 1 && needUpdateFlg === true) {
      if (objMatch.insuranceName === '') {
        this.appService.postDeleteMatchInsurance(objMatch);
      } else {
        this.appService.postEditMatchInsurance(objMatch);
      }
    }

    this.dialogRef.close();

  }

  callBackObject(objForm) {
    const importData = this.appService.patientImport.DB.data[this.data.index]
    let needUpdateFlg = false;
    const objMatch = {
      insuranceID: objForm.value.insuranceCompany.insuranceID,
      patientHN: importData.patientHN
    };

    if (importData.alreadyInserted === 1) {
      // tslint:disable-next-line:triple-equals
      if (importData.currentInsurance != objForm.value.insuranceCompany.insuranceID) {
        needUpdateFlg = true;
      }
    }

    if (importData.alreadyInserted === 0) {
      if (objForm.value.insuranceCompany === '') {
        this.dialogRef.close();
        objForm.resetForm();
      }
      this.appService.postMatchInsurance(objMatch);

    } else if (importData.alreadyInserted === 1 && needUpdateFlg === true) {
      if (objForm.value.insuranceCompany === '') {
        this.appService.postDeleteMatchInsurance(objMatch);
      } else {
        this.appService.postEditMatchInsurance(objMatch);
      }
    }

    this.dialogRef.close();
    objForm.resetForm();

  }

}
