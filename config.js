/**
 * Created by sridharrajs on 1/6/16.
 */

'use strict';

let _ = require('lodash');
let fs = require('fs');

const ENVS = [
	'production',
	'local'
];

const CONFIGURATIONS = JSON.parse(fs.readFileSync('./configuration.json', 'utf-8'));

class Config {

	static isValidEnv(HOST_ENV) {
		return new Promise((resolve, reject)=> {
			if (_.contains(ENVS, HOST_ENV)) {
				resolve('Success');
			} else {
				reject('Failed');
			}
		});
	}

	static isSecretSet(MY_SECRET) {
		return new Promise((resolve, reject)=> {
			if (MY_SECRET) {
				resolve('Success');
			} else {
				reject('Failed');
			}
		});
	}

	static init(HOST_ENVIRONMENT) {
		this.port = CONFIGURATIONS.port;

		let settings = CONFIGURATIONS[HOST_ENVIRONMENT];
		this.secure = settings.secure;
		this.mongdbUrl = settings.mongodb_url;
		this.secret = process.env.MY_SECRET;
		return Promise.resolve('Success');
	}

}

module.exports = Config;