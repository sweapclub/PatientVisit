import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DbService {
  // private API = 'http://10.125.63.145:3000/api';
  private API = 'http://localhost:3000/api';

  constructor(private http: Http) { }

  getAllUser() {
    return this.http.get(`${this.API}/login/user`)
      .map(res => res.json());
  }

  getUserInterpreterTable() {
    return this.http.get(`${this.API}/interpreter/InterpreterStatus`)
      .map(res => res.json());
  }

  postLogin(loginDATA) {
    return this.http.post(`${this.API}/login/login`, loginDATA).map(res => res.json());
  }

  getInsuranceTable() {
    return this.http.get(`${this.API}/insurance/insuranceTable`).map(res => res.json());
  }

  getInsuranceList() {
    return this.http.get(`${this.API}/insurance/insuranceList`).map(res => res.json());
  }

  getNewInsuranceID() {
    return this.http.get(`${this.API}/insurance/insuranceNewId`).map(res => res.json());
  }

  postAddInsurance(objAdd) {
    return this.http.post(`${this.API}/insurance/insuranceAdd`, objAdd).map(res => res.json());
  }

  postEditInsurance(objEdit) {
    return this.http.post(`${this.API}/insurance/insuranceEdit`, objEdit).map(res => res.json());
  }

  getPatientImport() {
    return this.http.get(`${this.API}/patient/patientImport`).map(res => res.json());
  }

  postMatchInsurance(objEdit) {
    return this.http.post(`${this.API}/insurance/insuranceMatch`, objEdit).map(res => res.json());
  }

  postEditMatchInsurance(objEdit) {
    return this.http.post(`${this.API}/insurance/insuranceMatchEdit`, objEdit)
  }

  postDeleteMatchInsurance(objEdit) {
    return this.http.post(`${this.API}/insurance/insuranceMatchDelete`, objEdit)
  }

  getAssignWorkCurrent() {
    return this.http.get(`${this.API}/assignWork/assignWorkCurrent`).map(res => res.json());
  }

  postAssignInterpreter(obj) {
    return this.http.post(`${this.API}/assignWork/assignInterpreter`, obj);
  }

  getInterpreterAvailable() {
    return this.http.get(`${this.API}/assignWork/InterpreterAvailable`).map(res => res.json());
  }

  getListWork(objListWork) {
    return this.http.get(`${this.API}/submitWork/listWork/${objListWork.UserName}/${objListWork.admitDate}`)
      .map(res => res.json());
  }

  postUpdateWork(objUW) {
    return this.http.post(`${this.API}/submitWork/updateWork`, objUW);
  }

  getWorkStatus(date: String) {
    return this.http.get(`${this.API}/workStatus/workStatus/${date}`).map(res => res.json());
  }

  getShowComment(objWork) {
    return this.http.get(`${this.API}/workStatus/showComment/${objWork.admitDate}/${objWork.patientHN}`)
      .map(res => res.json());
  }

  getCurrentInWard() {
    return this.http.get(`http://10.125.10.46/interreq/currentinward.php`)
      .map(res => res.json());
  }

  postImport(obj) {
    return this.http.post(`${this.API}/importCurrentOnWard/import`, obj);
  }



}
