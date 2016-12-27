/**
 * Created by sridharrajs.
 */

'use strict';

let express = require('express');
let app = express.Router();

app.get('/', (req, res) => {
  res.status(200).send({
    msg: 'Server is up!'
  });
});

module.exports = (indexApp) => {
  indexApp.use('/', app);
};
