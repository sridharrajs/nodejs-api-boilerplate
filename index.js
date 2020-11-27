/**
 * Created by sridharrajs.
 */

const chalk = require('chalk');
const dotEnv = require('dotenv').config();

const config = require('./bin/config');

config.assertEnvironment(dotEnv).then(info => {
  console.log('Checking Environment ', chalk.blue(info));
  return config.init();
}).then(info => {
  console.log('Initializing settings ', chalk.blue(info));
  const connectionFactory = require('./app/db/connection-factory');// eslint-disable-line global-require
  return connectionFactory.connect(config.mongodbUrl);
}).then(info => {
  console.log('Connecting DB ', chalk.blue(info));
  const models = require('./app/models');// eslint-disable-line global-require
  return models.init();
}).then(info => {
  console.log('Initializing DB ', chalk.blue(info));
  const server = require('./bin/server');// eslint-disable-line global-require
  return server.start(config);
}).then(info => {
  console.log(`Starting Server at ${chalk.green(config.port)}`, chalk.blue(info));
}).catch(error => {
  console.trace(chalk.red(error));
  console.trace(chalk.red(error.message));
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.trace(error.stack);
});
