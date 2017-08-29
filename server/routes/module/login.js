const mysql = require('../mysql');
const express = require('express');
const router = express.Router();

// // declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';
// // Get all posts
// router.get('/posts', (req, res) => {
//   // Get posts from the mock api
//   // This should ideally be replaced with a service that connects to MongoDB
//   axios.get(`${API}/posts`)
//     .then(posts => {
//       res.status(200).json(posts.data);
//     })
//     .catch(error => {
//       res.status(500).send(error)
//     });
// });

router.post('/login', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  const obj = req.body;
  mysql.query('select FullName,Department,UserType from tbuserlogin where UserName = ? and Password = ?', [obj.userName, obj.password], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

module.exports = router;
