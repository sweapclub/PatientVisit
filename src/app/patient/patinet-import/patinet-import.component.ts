import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DbService } from '../../db-service.service';
import { PatientImport } from '../../model/patientImport';
import { InsuranceTable } from '../../model/insuranceTable';

@Component({
  selector: 'app-patinet-import',
  templateUrl: './patinet-import.component.html',
  styleUrls: ['./patinet-import.component.css']
})
export class PatinetImportComponent implements OnInit {
  subscription;
  patientImport: PatientImport[];

  constructor(public dialog: MdDialog, private dbService: DbService) {

  }

  ngOnInit() {
    this.subscription = this.dbService.getPatientImport().subscribe(data => {
      if (data.length !== 0) {
        this.patientImport = data;
      }
    })
  }

  openInsuranceDialog(data) {
    const dialogRef = this.dialog.open(PatientDialogComponent, { data });
    dialogRef.afterClosed().subscribe(() => {
      this.subscription = this.dbService.getPatientImport().subscribe(res => {
        if (res.length !== 0) {
          this.patientImport = res;
        }
      })
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
  subscription;
  insuranceTable: InsuranceTable[];
  insuranceFilter: InsuranceTable[];

  constructor(public dialogRef: MdDialogRef<PatientDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private dbService: DbService) {
  }

  filterStates(name: string) {
    if (name && name.trim() !== '') {
      this.insuranceFilter = this.insuranceTable.filter((insurance: InsuranceTable) => {
        return (insurance.ins_name.toLowerCase().indexOf(name.toLowerCase()) > -1);
      })
    } else {
      this.insuranceFilter = this.insuranceTable;
    }

  }

  ngOnInit() {
    this.subscription = this.dbService.getInsuranceTable().subscribe(data => {
      if (data.length !== 0) {
        this.insuranceTable = data;
        this.insuranceFilter = data;
      }
    })
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
      this.dbService.postMatchInsurance(objMatch).subscribe();

    } else if (this.data.alreadyInserted === 1 && needUpdateFlg === true) {
      if (objMatch.insuranceName === '') {
        this.dbService.postDeleteMatchInsurance(objMatch).subscribe();
      } else {
        this.dbService.postEditMatchInsurance(objMatch).subscribe();
      }
    }

    this.dialogRef.close();

  }
}
