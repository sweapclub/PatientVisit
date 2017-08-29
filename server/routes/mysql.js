var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '10.125.10.46',
    user     : 'nuttertools',
    password : '',
    database : 'interpreter_request'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
