import { Component, Inject, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
// import { Observable } from 'rxjs/Observable';
import { NgModule } from '@angular/core';

// import { AppService, ServiceDataSource, ServiceDatabase } from '../app-service.service';
import { InsuranceTable } from '../model/insuranceTable';
import { DbService } from '../db-service.service';


@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit, OnDestroy {
  // objForm: string;

  // displayedColumns = ['Name', 'Nationality', 'Website'];
  // dataSource: ServiceDataSource | null;
  // @ViewChild('filter') filter: ElementRef;

  sstTable;
  insuranceTable: InsuranceTable[];
  // sstOparation;
  constructor(public dialog: MdDialog, private dbService: DbService) {
  }

  ngOnInit() {

    this.sstTable = this.dbService.getInsuranceTable().subscribe(data => {
      if (data.length !== 0) {
        this.insuranceTable = data;
      }
    })

    // this.sstTable = this.appService.qrySuccess.subscribe(
    //   () => {
    //     this.dataSource = this.appService.dataSource;
    //     Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //       .debounceTime(150)
    //       .distinctUntilChanged()
    //       .subscribe(() => {
    //         if (!this.dataSource) { return; }
    //         this.dataSource.filter = this.filter.nativeElement.value;
    //       });
    //   }
    // );

    // this.sstOparation = this.appService.insuranceChanged.subscribe(
    //   () => {
    //     this.appService.getInsuranceTable();
    //   }
    // );

  }

  ngOnDestroy() {
    this.sstTable.unsubscribe();
    // this.sstOparation.unsubscribe();
  }

  // openAddDialog(Flg) {
  //   const dialogRef = this.dialog.open(InsuranceDialogComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       if (this.dataSource) {
  //         const isSame = this.dataSource.DB.data.findIndex((insurance) => {
  //           return insurance.insuranceName === result.insuranceName;
  //         })
  //         if (isSame !== -1) {
  //           // show error message !
  //           return;
  //         }
  //       }
  //       this.appService.postAddInsurance(result);


  //     }
  //   });
  // }

  // openEditDialog(Flg) {
  //   const dialogRef = this.dialog.open(InsuranceDialogComponent, {
  //     data: Flg,
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       const isSame = this.dataSource.DB.data.findIndex((insurance) => {
  //         return insurance.insuranceName === result.insuranceName;
  //       })
  //       const jsonEdit = {
  //         insuranceID: result.insuranceID,
  //         insuranceName: result.insuranceName,
  //         insuranceNationality: result.insuranceNationality,
  //         insuranceEmail: result.insuranceEmail,
  //         insuranceTelephone: result.insuranceTelephone,
  //         insuranceDescription: result.insuranceEescription
  //       };

  //       this.appService.postEditInsurance(jsonEdit);
  //     }
  //   });
  // }

}


// // ///////////////////////////////
// @Component({
//   selector: 'app-insurance-dialog',
//   templateUrl: './insurance-dialog.component.html'
// })
// export class InsuranceDialogComponent {
//   insuranceData;
//   constructor(public dialogRef: MdDialogRef<InsuranceDialogComponent>,
//     @Inject(MD_DIALOG_DATA) public data: any) {

//   }

//   callBackObject(objForm) {
//     if (objForm.invalid) {
//       return;
//     }
//     if (this.data) {
//       this.insuranceData = {
//         insuranceID: this.data.insuranceID,
//         insuranceName: objForm.value.name,
//         insuranceNationality: objForm.value.nationality,
//         insuranceEmail: objForm.value.email,
//         insuranceTelephone: objForm.value.telephone,
//         insuranceDescription: objForm.value.description
//       };
//     } else {
//       this.insuranceData = {
//         insuranceID: 'NULL',
//         insuranceName: objForm.value.name,
//         insuranceNationality: objForm.value.nationality,
//         insuranceEmail: objForm.value.email,
//         insuranceTelephone: objForm.value.telephone,
//         insuranceDescription: objForm.value.description
//       };
//     }

//     objForm.resetForm();

//     this.dialogRef.close(this.insuranceData)
//   }
// }
