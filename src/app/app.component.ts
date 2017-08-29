import { Component, OnInit } from '@angular/core';
import { AppService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Assign Work Interpreter';
  links = [
    { name: 'Home', path: '\Home' },
    { name: 'Interpreter Status', path: '\interpreter' },
    { name: 'Insurance Company', path: '\insurance' },
    { name: 'Patient Info', path: '\patient'},
    { name: 'Assign Work', path: '\assignWork'}
  ];
  disabledNav = true;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.disabledNav = this.appService.checkLogin();
    this.appService.loginChanged.subscribe(
      () => {
        this.disabledNav = this.appService.checkLogin(); // this.swService.getCharacters(this.loadedSide);
      }
    );

  }
}
