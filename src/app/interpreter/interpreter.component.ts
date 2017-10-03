import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DbService } from '../db-service.service';
import { InterpreterStatus } from '../model/interpreterStatus';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styleUrls: ['./interpreter.component.css']
})
export class InterpreterComponent implements OnInit, OnDestroy {

  subscription;
  interpreters: InterpreterStatus[];
  objInterpreter;

  constructor(private dbService: DbService) {
  }

  ngOnInit() {

    this.subscription = this.dbService.getUserInterpreterTable().subscribe(data => {
      if (data.length !== 0) {
        this.interpreters = data;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
