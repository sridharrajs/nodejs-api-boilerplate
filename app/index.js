/**
 * Created by sridharrajs on 1/6/16.
 */

const cors = require('cors');
const express = require('express');
const compression = require('compression');
const expressValidator = require('express-validator');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use(expressValidator());
app.set('view engine', 'pug');

const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

app.use(require('./middleware/request-header'));
app.use('/', require('./routes/index-routes'));
app.use('/users', require('./routes/user-routes'));
app.use('/users/me', require('./routes/me-routes'));

module.exports = app;
