const mysql = require('../mysql');
const express = require('express');
const router = express.Router();

router.get('/patientImport', function (req, res) {
  mysql.query(`SELECT ow8am.patientHN,ow8am.patientName,ow8am.patientAge,ow8am.nationality,ow8am.admitWard,ow8am.admitRoom,
  case
  when isnull(mat.insuranceName)
  then ''
  else mat.insuranceName
  end as insuranceName,
  CASE
  when isnull(mat.patientHN)
  then false
  else true
  end as alreadyInserted
  FROM tbcurrent_onward_8am as ow8am left join tbmatch_insurance_patient as mat on mat.patientHN = ow8am.patientHN
  where admitDate = date(now())`,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    });
})


module.exports = router;
