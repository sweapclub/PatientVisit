// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const apiLogin = require('./server/routes/module/login');
const apiInsurance = require('./server/routes/module/insurance');
const apiInterpreter = require('./server/routes/module/interpreter');
const apiPatient = require('./server/routes/module/patient');
const apiAssignWork = require("./server/routes/module/assignwork");
const apiSubmitWork = require('./server/routes/module/submitWork');
const apiWorkStatus = require('./server/routes/module/workStatus');
const apiImportCurrentOnWard = require('./server/routes/module/importCurrentOnWard');
const apiReport = require('./server/routes/module/report');

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

//app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api/login', apiLogin);
app.use('/api/insurance', apiInsurance);
app.use('/api/interpreter', apiInterpreter);
app.use('/api/patient', apiPatient);
app.use('/api/assignWork', apiAssignWork);
app.use('/api/submitWork', apiSubmitWork);
app.use('/api/workStatus', apiWorkStatus);
app.use('/api/importCurrentOnWard', apiImportCurrentOnWard);
app.use('/api/report',apiReport);

// Catch all other routes and return the index file
app.get('/AssignWorkInterpreter', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
