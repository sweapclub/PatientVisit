const mysql = require('../mysql');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('api Work !');
})

router.get('/workStatus/:admitDate', function (req, res) {
  const admitDate = req.params.admitDate;
  mysql.query(`
  SELECT cow.patientHN, cow.patientName, cow.nationality, cow.admitWard, cow.admitRoom,
  case when ifnull(ai.statusOfPatient,'') = ""
  then 0
  else 1
  end as finishedFlg,
  cow.assignDate, login.FullName as InterpreterName
  FROM
  tbassignwork_interpreter as ai inner join
  tbcurrent_onward_8am as cow on ai.assignDate = cow.assignDate and ai.patientHN = cow.patientHn left join
  tbuserlogin as login on login.username = ai.interpreterID
  WHERE ai.assignDate = '${admitDate}'
  `,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});

router.get('/showComment/:admitDate/:patientHN',(req,res) => {
  const admitDate = req.params.admitDate;
  const patientHN = req.params.patientHN;

  mysql.query(`
    SELECT assignDate,
    ifnull(visaInformation,'') as visaInformation,
    ifnull(statusOfPatient, '') as statusOfPatient,
    ifnull(complaint,'')as complaint,
    ifnull(request,'') as request,
    FullName AS interpreterName,
    case when ifnull(statusOfPatient,'') = ""
    then 0
    else 1
    end as finishFlg
    FROM tbassignwork_interpreter AS ai
    LEFT JOIN tbuserlogin AS inter ON ai.interpreterID = inter.username
    WHERE assignDate
    IN (
      '${admitDate}',
      DATE_ADD('${admitDate}', INTERVAL -1 DAY ),
      DATE_ADD('${admitDate}', INTERVAL -2 DAY )
    )
    AND patientHN =  '${patientHN}'
    order by assignDate desc
  `,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});

module.exports = router;
