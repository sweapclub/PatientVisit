import { Component, OnInit } from '@angular/core';

import {AppService} from '../app-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {

  }
  onSubmit(objForm) {
    if (objForm.invalid) {
      return;
    }
    const loginData = { userName: objForm.value.inpUserName, password: objForm.value.inpPassword };
    this.appService.onLogin(loginData);
    objForm.resetForm();
  }
}
