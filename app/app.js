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

let path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

app.use(require('./middleware/request-header'));
app.use('/', require('./routes/index-routes'));
app.use('/users', require('./routes/user-routes'));
app.use('/users/me', require('./routes/me-routes'));

module.exports = app;