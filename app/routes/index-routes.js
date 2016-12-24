/**
 * Created by sridharrajs.
 */

'use strict';

let express = require('express');
let app = express.Router();
let qs = require('qs');

app.get('/', (req, res) => {
  res.status(200).send({
    msg: 'Server is up!'
  });
});

module.exports = app;