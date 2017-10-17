const mysql = require('../mysql');
const express = require('express');
const router = express.Router();

router.post('/import', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  var jsondata = req.body;
  var values = [];

  for (var i = 0; i < jsondata.length; i++)
    values.push([
      jsondata[i].assignDate,
      jsondata[i].admitDate,
      jsondata[i].patientHN,
      jsondata[i].patientName,
      jsondata[i].patientAge,
      jsondata[i].nationality,
      jsondata[i].admitWard,
      jsondata[i].admitRoom
    ]);

  mysql.query(`
    insert into tbcurrent_onward_8am
    (assignDate,admitDate,patientHN,patientName,patientAge,nationality,admitWard,admitRoom)
    VALUES ?
  `, [values], function (err, result) {
      if (err) throw err;
      console.log('done !');
    });

})

module.exports = router;
