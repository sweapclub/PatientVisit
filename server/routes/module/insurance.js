const mysql = require('../mysql');
const express = require('express');
const router = express.Router();

// router.get('/insuranceTable', function (req, res) {
//   mysql.query(`SELECT insuranceID,insuranceName,insuranceNationality,insuranceEmail,
//     insuranceTelephone,insuranceDescription,insuranceName as Search
//     FROM tbinsurance
//     order by insuranceName`, function (err, result) {
//       if (err) throw err;
//       res.send(result);
//     });
// })

router.get('/insuranceTable', function (req, res) {
  mysql.query(`SELECT ins_name, ins_branch_region, ins_website,ins_name as Search
  FROM  insurance.insurance
  ORDER BY ins_name`, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
})

router.get('/insuranceList', function (req, res) {
  mysql.query(`
  SELECT ins_name,ins_branch_region, ins_name as Search
  FROM  insurance.insurance
  ORDER BY ins_name
  `, function (err, result) {
      if (err) throw err;
      res.send(result);
    })
})

// router.post('/insuranceAdd', function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   const obj = req.body;
//   mysql.query(`INSERT INTO  tbinsurance SET ?`
//     , [obj], (err, result) => {
//       if (err) throw err;
//       res.send(result);
//     })
// })

// router.post('/insuranceEdit', function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   const obj = req.body;
//   const updateSet = {
//     insuranceName: obj.insuranceName,
//     insuranceNationality: obj.insuranceNationality,
//     insuranceEmail: obj.insuranceEmail,
//     insuranceTelephone: obj.insuranceTelephone,
//     insuranceDescription: obj.insuranceEescription
//   };
//   mysql.query(`UPDATE tbinsurance SET ? where insuranceId = ?`
//     , [updateSet, obj.insuranceID], (err, result) => {
//       if (err) throw err;
//       res.send(result);
//     })

// })

router.post('/insuranceMatch', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  const obj = req.body;
  mysql.query(`INSERT INTO  tbmatch_insurance_patient SET ?`
    , [obj], (err, result) => {
      if (err) throw err;
      res.send(result);
    })

})

router.post('/insuranceMatchDelete', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  const obj = req.body;
  mysql.query(`DELETE FROM tbmatch_insurance_patient WHERE patientHN = ?`
    , [obj.patientHN], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

router.post('/insuranceMatchEdit', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  const obj = req.body;
  mysql.query(`UPDATE tbmatch_insurance_patient SET insuranceName = ? where patientHN = ?`
    , [obj.insuranceName, obj.patientHN], (err, result) => {
      if (err) throw err;
      res.send(result);
    });

});

module.exports = router;
