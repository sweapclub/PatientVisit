import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../app-service.service';
import { ServiceDataSource, ServiceDatabase } from '../app-service.service';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styleUrls: ['./interpreter.component.css']
})
export class InterpreterComponent implements OnInit, OnDestroy {
  displayedColumns = ['FullName', 'Language', 'Status'];
  dataSource: ServiceDataSource | null;
  @ViewChild('filter') filter: ElementRef;
  subscription;

  objInterpreter;

  constructor(private appService: AppService) {
    this.objInterpreter = this.appService.getInterpreterStatusTable();

    // console.log(this.objInterpreter);
    // this.dataSource = new ServiceDataSource(new ServiceDatabase(this.objInterpreter));
    // this.dataSource = this.appService.getInterpreterStatus();
  }

  ngOnInit() {
    this.subscription = this.appService.qrySuccess.subscribe(
      () => {
        this.dataSource = this.appService.dataSource;
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          });
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
