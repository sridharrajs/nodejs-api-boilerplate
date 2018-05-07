/**
 * Created by sridharrajs on 1/6/16.
 */

'use strict';

let bp = require('body-parser');
let cors = require('cors');
let express = require('express');
let compression = require('compression');
let expressValidator = require('express-validator');
let helmet = require('helmet');

let app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bp.json());
app.use(bp.urlencoded({
  extended: false
}));

app.use(expressValidator());
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

let reqHeaders = require('./middleware/request-header');
app.use(reqHeaders);

let indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

let userRoutes = require('./routes/user-routes');
app.use('/users', userRoutes);

let meRoutes = require('./routes/me-routes');
app.use('/users/me', meRoutes);

module.exports = app;