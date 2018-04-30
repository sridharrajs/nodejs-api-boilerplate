/**
 * Created by sridharrajs.
 */

'use strict';

let express = require('express');
let app = express.Router();

function index(req, res) {
  res.status(200).send({
    msg: 'Server is up!'
  });
}

app.get('/', index);

module.exports = (indexApp) => {
  indexApp.use('/', app);
};
