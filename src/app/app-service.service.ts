import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { DbService } from './db-service.service';

import { Cookie } from 'ng2-cookies';
import { Login } from './model/login';

@Injectable()
export class AppService {

  login: Login;
  loginChanged = new Subject<void>();
  // parentRouter;
  constructor(
    private dbService: DbService,
    private checkRouter: Router
  ) {
  }

  onLogin(loginData) {
    // console.log('in');
    this.dbService.postLogin(loginData).subscribe(login => {

      if (login.length !== 0) {
        // console.log('login empty');

        this.checkRouter.navigateByUrl('/');
        // localStorage.setItem('login', JSON.stringify(login[0]));
        Cookie.set('login', JSON.stringify(login[0]));

        this.getLoginCookie();
        this.loginChanged.next();
      }
    })
  }

  getLoginCookie() {
    const cookie = Cookie.get('login');
    // console.log(JSON.parse(cookie));
    if (cookie) {
      this.login = JSON.parse(cookie);
      return this.login;
    } else {
      return null;
    }
  }

  deleteLoginCookie() {
    Cookie.deleteAll();
    this.login = null;
    return this.login;
  }

  checkLogin() {
    if (!Cookie.get('login')) {
      // this.checkRouter.navigateByUrl('/login');
      this.navigateUrl('/login')
      return true;
    }
    return false;
  }

  navigateUrl(url: String) {
    this.checkRouter.navigateByUrl(`${url}`);
  }

  cutHtmlTagInString(str: String): String {
    const char = str.split('');
    let result: String = '';
    let flgKeep: Boolean = true;
    for (const s of char) {
      if (s === '<') {
        flgKeep = false;
      } else if (s === '>') {
        flgKeep = true;
        continue;
      }
      if (flgKeep === true) { result = result + s };
    }
    return result;
  }

}
