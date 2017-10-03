import { Component, OnInit } from '@angular/core';

import { AppService } from '../../app-service.service';
@Component({
  selector: 'app-report-patient-list',
  templateUrl: './report-patient-list.component.html',
  styleUrls: ['./report-patient-list.component.css']
})
export class ReportPatientListComponent implements OnInit {
  currentDate = new Date();

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  backToMainReport() {
    this.appService.navigateUrl('/report');
  }

  refreshData() {

  }



  // SELECT
  // cow.admitWard,
  // cow.admitRoom,
  // cow.patientHN,
  // cow.patientName,
  // cow.patientAge,
  // cow.nationality,
  // login.fullName
  // FROM tbcurrent_onward_8am as cow left join tbassignwork_interpreter as ai on ai.assignDate = cow.assignDate and ai.patientHN = cow.patientHN left join
  // tbuserlogin as login on ai.interpreterID = login.username
  // WHERE cow.assignDate = '2017-09-26'
  // order by cow.admitWard,cow.admitRoom
}




// SELECT
// cow.admitWard,
// cow.admitRoom,
// cow.patientHN,
// cow.patientName,
// cow.patientAge,
// cow.nationality,
// login.fullName,
// (select inscase_summary
// from insurance.insurance_case
// where pat_id = pat.patient_hn
// order by inscase_lastdate
// limit 1) as insuranceInfo
// FROM tbcurrent_onward_8am as cow left join
// tbassignwork_interpreter as ai on ai.assignDate = cow.assignDate and ai.patientHN = cow.patientHN left join
// tbuserlogin as login on ai.interpreterID = login.username
// left join insurance.patient as pat on pat.patient_hn = cow.patientHN
// WHERE cow.assignDate = '2017-09-26'
// order by cow.admitWard,cow.admitRoom


// select patient_hn, inscase_summary
// from insurance_case as incase inner join patient as pat on incase.pat_id = pat.patient_id
// where inscase_lastdate between DATE_ADD('2017-09-27',interval -1 day) and date('2017-09-27')


// ok


// SELECT
// cow.admitWard,
// cow.admitRoom,
// cow.patientHN,
// cow.patientName,
// cow.patientAge,
// cow.nationality,
// login.fullName,
// (


// select inscase_summary
// from insurance.insurance_case as incase inner join insurance.patient as pat on incase.pat_id = pat.patient_id
// where inscase_lastdate between DATE_ADD('2017-09-27',interval -1 day) and date('2017-09-27 23:59:59')
// order by inscase_lastdate
// limit 0,1

// ) as insuranceInfo
// FROM tbcurrent_onward_8am as cow left join
// tbassignwork_interpreter as ai on ai.assignDate = cow.assignDate and ai.patientHN = cow.patientHN left join
// tbuserlogin as login on ai.interpreterID = login.username
// WHERE cow.assignDate = '2017-09-27'
// order by cow.admitWard,cow.admitRoom
