/**
 * Created by sridharrajs.
 */

'use strict';

let chalk = require('chalk');

let config = require('./config');

const HOST_ENVIRONMENT = process.env.NODE_ENV;
const MY_SECRET = process.env.MY_SECRET;

config
	.isValidEnv(HOST_ENVIRONMENT)
	.then((info)=> {
		console.log('Checking Environment ', chalk.blue(info));
		return config.isSecretSet(MY_SECRET);
	})
	.then((info)=> {
		console.log('Checking tokens ', chalk.blue(info));
		return config.init(HOST_ENVIRONMENT);
	})
	.then((info)=> {
		console.log('Initializing settings ', chalk.blue(info));
		let connectionFactory = require('./app/server/boot/connection-factory');
		return connectionFactory.connect(config);
	})
	.then((info)=> {
		console.log('Initializing DB ', chalk.blue(info));
		let appServer = require('./app/server/boot/build-server');
		return appServer.start(config);
	})
	.then((info)=> {
		console.log(`Starting Server at ${chalk.green(config.port)}`, chalk.blue(info));
	})
	.catch((error)=> {
		console.trace(chalk.red(error.stack.split('\t ')));
		process.exit(0);
	});
