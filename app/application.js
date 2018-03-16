/**
 * Created by sridharrajs on 1/6/16.
 */

'use strict';

let bp = require('body-parser');
let cors = require('cors');
let express = require('express');
let compression = require('compression');
let helmet = require('helmet');

let app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bp.json());
app.use(bp.urlencoded({
  extended: false
}));

let reqHeaders = require('./middleware/request-header');
app.use(reqHeaders);

let indexRoutes = require('./routes/index-routes');
indexRoutes(app);

let userRoutes = require('./routes/user-routes');
userRoutes(app);

module.exports = app;