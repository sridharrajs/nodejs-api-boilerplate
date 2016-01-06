/**
 * Created by sridharrajs.
 */

'use strict';

let https = require('https');
let http = require('http');

let application = require('../app');

function getServerByProtocol(config, app) {
	if (config.secure) {
		return https.createServer(config.options, app);
	}
	return http.createServer(app);
}

class Server {
	static start() {
		let server = getServerByProtocol(config, application.getApp());
		return new Promise((resolve, reject)=> {
			server.listen(config.port, ()=> {
				resolve('success');
			}).on('error', (err)=> {
				reject(err);
			});
		});
	}
}

module.exports = Server;