const mysql = require('../mysql');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('api Work !');
})

router.get('/test', function (req, res) {
  mysql.query(`
  SELECT
  cow.admitWard,
  cow.admitRoom,
  cow.patientHN,
  cow.patientName,
  cow.patientAge,
  cow.nationality,
  login.fullName,
  insurance.ins_name,
  insurance.follow_desc
  FROM tbcurrent_onward_8am as cow left join
  tbassignwork_interpreter as ai on ai.assignDate = cow.assignDate and ai.patientHN = cow.patientHN left join
  tbuserlogin as login on ai.interpreterID = login.username
  left join
  (
    SELECT follow_desc, pat.patient_hn, ins_name,inscase_lastdate
    FROM (
      SELECT inscase_id, ins_id, pat_id,inscase_lastdate
      FROM insurance.insurance_case
      WHERE date( inscase_lastDate ) between date( date_add(now( ),interval -7 day) )
        and date( date_add(now( ),interval -1 day) )
    ) AS insCase
    LEFT JOIN (
      SELECT inscase_id, follow_desc, follow_id
      FROM insurance.follow
      WHERE date( follow_date ) between date( date_add(now( ),interval -7 day) )
      and date( date_add(now( ),interval -1 day) )
    ) AS follow ON follow.inscase_id = insCase.inscase_id
    INNER JOIN insurance.patient AS pat ON inscase.pat_id = pat.patient_id
    LEFT JOIN insurance.insurance AS insu ON insu.ins_id = insCase.ins_id
    GROUP BY patient_hn
    HAVING max(inscase_lastdate)
    ) as insurance on insurance.patient_hn = cow.patientHN
  WHERE cow.assignDate = date(now())
  order by cow.admitWard,cow.admitRoom
  `,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});



module.exports = router;
