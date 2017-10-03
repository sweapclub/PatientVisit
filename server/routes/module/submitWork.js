const mysql = require('../mysql');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('api Work !');
})

router.get('/listWork/:interID/:admitDate', function (req, res) {
  const interID = req.params.interID;
  const admitDate = req.params.admitDate;

  // SELECT cow.patientHN, cow.patientName, cow.nationality, cow.admitWard, cow.admitRoom, ai.finishedFlg, ai.comment, cow.assignDate, cow.admitDate
  // FROM
  // tbassignwork_interpreter as ai inner join
  // tbcurrent_onward_8am as cow on ai.assignDate = cow.assignDate and ai.patientHN = cow.patientHn
  //

  mysql.query(`
  SELECT cow.patientHN, cow.patientName, cow.nationality, cow.admitWard, cow.admitRoom,
  case when ai.statusOfPatient = ""
  then 0
  else 1
  end as finishedFlg
  , ifnull(ai.visaInformation,'') as visaInformation
  , ifnull(ai.statusOfPatient,'') as statusOfPatient
  , ifnull(ai.complaint,'') as complaint
  , ifnull(ai.request,'') as request
  , cow.assignDate, cow.admitDate,ai.reportManager
    FROM
    tbassignwork_interpreter as ai inner join
    tbcurrent_onward_8am as cow on ai.assignDate = cow.assignDate and ai.patientHN = cow.patientHn

  WHERE ai.interpreterID = '${interID}' and ai.assignDate = '${admitDate}'
  `,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});


// strInputString = strInputString.replace(/'/g, "\\'");
router.post('/updateWork', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const obj = req.body;
  const reportManager = obj.reportManager;
  const visaInformation = obj.visaInformation.replace(/'/g, "\\'");
  const statusOfPatient = obj.statusOfPatient.replace(/'/g, "\\'");
  const complaint = obj.complaint.replace(/'/g, "\\'");
  const request = obj.request.replace(/'/g, "\\'");

  mysql.query(`
    update tbassignwork_interpreter
    set reportManager = ${reportManager},
      visaInformation = '${visaInformation}',
      statusOfPatient = '${statusOfPatient}',
      complaint = '${complaint}',
      request = '${request}'
    where assignDate = '${obj.admitDate}' and patientHN = '${obj.patientHN}'
  `, (err, result) => {
      if (err) throw err;
      res.send();
    });
});

// router.post('/assignInterpreter', (req, res) => {
//   if (!req.body) return res.sendStatus(400)
//   const obj = req.body;
//   mysql.query(`
//     SELECT * FROM tbassignwork_interpreter
//     where admitDate = date('${obj.admitDate}') and patientHN = '${obj.patientHN}'
//   `, function (err, result) {
//       if (err) throw err;
//       if (result.length == 0) {
//         // mysql.query()
//         console.log('do insert');

//         res.send(insertWork(obj));
//       } else {
//         // mysql.query()
//         console.log('do update');

//         res.send(updateWork(obj));
//       }
//     });
// })

module.exports = router;




// SELECT cow.patientHN, cow.patientName, cow.nationality, cow.admitWard, cow.admitRoom, ai.finishedFlg, ai.comment
// FROM
// `tbassignwork_interpreter`  as ai inner join
// tbcurrent_onward_8am as cow on ai.admitDate = cow.admitDate and ai.patientHN = cow.patientHn
// WHERE ai.interpreterID = '021555' and ai.admitDate = '2017-09-18'
