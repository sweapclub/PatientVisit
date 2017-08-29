const mysql = require('../mysql');
const express = require('express');
const router = express.Router();

router.get('/InterpreterStatus', function (req, res) {
  mysql.query(`select * from (
              SELECT FullName , IFNULL( GROUP_CONCAT( Lname SEPARATOR ', ' ) , '' ) AS Language,
              CASE WHEN ckid.checkin_flg = 1 THEN
                CASE WHEN STATUS = 'Translate' THEN 'Translate'
                ELSE 'Available'
                END ELSE 'Absent'
              END AS 'Status',FullName as Search
              FROM tbuserlogin AS inter LEFT JOIN tbinterpreter_language AS lang ON inter.username = lang.UserName
              LEFT JOIN tblanguage AS mainLang ON lang.LID = mainLang.LID
              LEFT JOIN tbcheckin_daily AS ckid ON inter.username = ckid.checkin_username AND ckid.checkin_date = DATE_FORMAT( CURDATE( ) , '%Y-%m-%d' )
              WHERE UserType = 'Interpreter' GROUP BY fullname
              ) as CorrectData`,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    });
})

module.exports = router;
