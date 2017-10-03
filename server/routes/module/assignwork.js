const mysql = require('../mysql');
const express = require('express');
const router = express.Router();

router.get('/assignWorkCurrent', function (req, res) {
  mysql.query(`SELECT cow.assignDate, cow.admitDate, cow.patientHN, patientName, patientAge, nationality, admitWard, admitRoom, fullName
  FROM tbcurrent_onward_8am AS cow
  LEFT JOIN tbassignwork_interpreter AS asInter ON asInter.assignDate = cow.assignDate
  AND asinter.patientHN = cow.patientHN
  LEFT JOIN tbuserlogin AS usrInter ON usrInter.username = asinter.interpreterID
  WHERE cow.assignDate = DATE( NOW( ) ) `,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    });
})

router.post('/assignInterpreter', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const obj = req.body;
  mysql.query(`
    SELECT * FROM tbassignwork_interpreter
    where assignDate = date('${obj.admitDate}') and patientHN = '${obj.patientHN}'
  `, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        // mysql.query()
        // console.log('do insert');

        res.send(insertWork(obj));
      } else {
        // mysql.query()
        // console.log('do update');

        res.send(updateWork(obj));
      }
    });
})

function insertWork(obj) {
  mysql.query(`
    insert into tbassignwork_interpreter(assignDate, patientHN, interpreterID)
    value ('${obj.admitDate}','${obj.patientHN}','${obj.interpreterID}')
  `, (err, result) => {
      if (err) throw err;
      console.log('insert');
      return (result);
    });
}

function updateWork(obj) {
  mysql.query(`
    update tbassignwork_interpreter
    set interpreterID = '${obj.interpreterID}',
        finishedFlg = 0,
        comment = ''
    where assignDate = '${obj.admitDate}' and patientHN = '${obj.patientHN}'
  `, (err, result) => {
      if (err) throw err;
      return (result);
    });
}

router.get('/interpreterAvailable', (req,res) => {
  // ver 1
  // SELECT UserName, FullName
  // FROM  tbuserlogin AS login
  // INNER JOIN tbcheckin_daily AS ckn ON login.UserName = ckn.checkin_UserName
  // WHERE ckn.checkin_date = DATE( NOW( ) )
  // AND checkin_isArabic = 0
  // AND checkin_flg = 1

  // ver 2
  // SELECT UserName, FullName, ifnull( workAmount, '0' ) AS workAmount
  // FROM tbuserlogin AS login
  // INNER JOIN tbcheckin_daily AS ckn ON login.UserName = ckn.checkin_UserName
  // LEFT JOIN (
  //   SELECT interpreterID, count( * ) AS workAmount
  //   FROM tbassignwork_interpreter
  //   WHERE assignDate = Date( NOW( ) )
  //   GROUP BY interpreterID
  // )ai ON ai.interpreterID = login.UserName
  // WHERE ckn.checkin_date = DATE( NOW( ) )
  // AND checkin_isArabic =0
  // AND checkin_flg =1

  // , ifnull( count( ai.interpreterID ) , '0' )


  mysql.query(`
  SELECT UserName, FullName,
  case when isnull(count(ai.interpreterID))
  then 0
  else count(ai.interpreterID)
  end
  AS workAmount
  FROM tbuserlogin AS login
  INNER JOIN tbcheckin_daily AS ckn ON login.UserName = ckn.checkin_UserName
  LEFT JOIN tbassignwork_interpreter AS ai ON ai.interpreterID = login.UserName
  AND ai.assignDate = Date( Now( ) )
  WHERE ckn.checkin_date = DATE( NOW( ) )
  AND checkin_isArabic =0
  AND checkin_flg =1
  GROUP BY UserName, FullName

  `,(err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
})


module.exports = router;
