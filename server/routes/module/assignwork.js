const mysql = require('../mysql');
const express = require('express');
const router = express.Router();

router.get('/assignWorkCurrent', function (req, res) {
  mysql.query(`SELECT cow.admitDate, cow.patientHN, patientName, patientAge, nationality, admitWard, admitRoom, fullName
  FROM tbcurrent_onward_8am AS cow
  LEFT JOIN tbassignwork_interpreter AS asInter ON asInter.admitDate = cow.admitDate
  AND asinter.patientHN = cow.patientHN
  LEFT JOIN tbuserlogin AS usrInter ON usrInter.username = asinter.interpreterID
  WHERE cow.admitDate = DATE( NOW( ) ) `,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    });
})


module.exports = router;
