import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { DbService } from './db-service.service';

@Injectable()
export class AppService {
  // Service With DB

  // data at table
  dataSource: ServiceDataSource | null;
  qrySuccess = new Subject<void>();

  // Normal Query
  loginUser: any = [];
  loginChanged = new Subject<void>();

  insuranceChanged = new Subject<void>();

  insuranceList: ServiceDataSource | null;
  insuranceListSuccess = new Subject<void>();

  patientImport: ServiceDataSource | null;
  patientImportSuccess = new Subject<void>();

  assignWorkCurrent: ServiceDataSource | null;
  assignWorkCurrentSuccess = new Subject<void>();

  //
  parentRouter;

  constructor(private dbService: DbService, http: Http, private checkRouter: Router) {
  }

  onLogin(loginData) {
    // this.dbService.postLogin(loginData.user, loginData.pwd).subscribe(login => {
    this.dbService.postLogin(loginData).subscribe(login => {
      if (login.length !== 0) {
        this.loginUser = login;
        this.checkRouter.navigateByUrl('/');
        this.loginChanged.next();
      }
    })
  }

  checkLogin() {
    if (this.loginUser.length === 0) {
      this.checkRouter.navigateByUrl('/login');
      return true;
    }
    return false;
  }

  getInterpreterStatusTable() {
    this.dbService.getUserInterpreterTable().subscribe(data => {
      if (data.length !== 0) {
        this.dataSource = new ServiceDataSource(new ServiceDatabase(data));
        this.qrySuccess.next();
      }
    })
  }

  getInsuranceTable() {
    this.dbService.getInsuranceTable().subscribe(data => {
      if (data.length !== 0) {
        this.dataSource = new ServiceDataSource(new ServiceDatabase(data));
        this.qrySuccess.next();
      }
    })
  }

  getInsuranceList() {
    this.dbService.getInsuranceList().subscribe(data => {
      if (data.length !== 0) {
        this.insuranceList = null;
        this.insuranceList = new ServiceDataSource(new ServiceDatabase(data));
        this.insuranceListSuccess.next();
      }
    })
  }

  postMatchInsurance(matchData) {
    this.dbService.postMatchInsurance(matchData).subscribe(() => {
      this.getPatientImport();
    })
  }

  postEditMatchInsurance(matchData) {
    this.dbService.postEditMatchInsurance(matchData).subscribe();
  }

  postDeleteMatchInsurance(matchData) {
    this.dbService.postDeleteMatchInsurance(matchData).subscribe(() => {

    });
  }

  getPatientImport() {
    this.dbService.getPatientImport().subscribe(data => {
      if (data.length !== 0) {
        this.patientImport = new ServiceDataSource(new ServiceDatabase(data), false);
        this.patientImportSuccess.next();
      }
    })
  }
  getAssignWorkCurrent() {
    this.dbService.getAssignWorkCurrent().subscribe(data => {
      if (data.length !== 0) {
        this.assignWorkCurrent = new ServiceDataSource(new ServiceDatabase(data), false);
        this.assignWorkCurrentSuccess.next();
      }
    })
  }

}

// -------------------------------------------------------------

/** An example database that the data source uses to retrieve data for the table. */
export class ServiceDatabase {
  // not binding interface can use anywhere any data !
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(objData) {
    this.dataChange.next(objData);
  }

  // addData(jsonObj) {
  //   // for Add manual ! and show in Table
  //   console.log(jsonObj);
  //   const tempData = this.data.slice();
  //   tempData.push({ id: '3', name: 'a T.', progress: '68', color: 'fuchsia' },
  //     { id: '4', name: 'b A.', progress: '79', color: 'green' });
  //   this.dataChange.next(tempData);
  // }

}

export class ServiceDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(public DB: ServiceDatabase, private searchFlg = true) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.DB.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.DB.data.slice().filter((item: any) => {
        if (this.searchFlg === true) {
          const searchStr = (item.Search).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        } else {
          return this.DB.data;
        }
      });
    });
  }

  disconnect() { }
}
