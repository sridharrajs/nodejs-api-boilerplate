/**
 * Created by sridharrajs on 1/6/16.
 */

'use strict';

let bp = require('body-parser');
let cors = require('cors');
let express = require('express');
let compression = require('compression');
let helmet = require('helmet');

let authFilter = require('./middlewares/auth-filter');
let reqHeaderFilter = require('./middlewares/request-header');

let app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bp.json());
app.use(bp.urlencoded({
	extended: false
}));

app.use(reqHeaderFilter.setHeaders);
app.use(express.static('./app/client/'));
app.set('view engine', 'ejs');

app.all('/*', [authFilter.authenticate]);


let indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

let userRoutes = require('./routes/user-routes');
app.use('/users', userRoutes);

function getApp() {
	return app;
}

module.exports = {
	getApp
};