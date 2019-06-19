/**
 * Created by ramachandrang.
 */

'use strict';

const chalk = require('chalk');
const config = require('./config');
const CF = require('./app/boot/connection-factory');
const MongoMockServer = require('mongodb-memory-server').MongoMemoryServer;
const dotenv = require('dotenv').config({ path: `${__dirname}/.env.test` });
const mInstance = new MongoMockServer();

class TestFactory extends CF {

  static init() {
    if (dotenv.error) {
      console.trace(chalk.red('.env.test file is missing'));
      return Promise.reject('.env.test file is missing');
    }

    return config.isValidEnv(process.env.NODE_ENV).then(info => {
      console.log('Checking Environment ', chalk.blue(info));
      return config.isSecretSet(process.env.MY_SECRET);
    }).then(info => {
      console.log('Checking tokens ', chalk.blue(info));
      return config.init(process.env.HOST_ENVIRONMENT);
    }).then(info => {
      console.log('Initializing settings ', chalk.blue(info));
      return mInstance.getConnectionString().then((mongoUri) => {
        return super.connect(mongoUri);
      });
    }).then(info => {
      console.log('Connecting DB ', chalk.blue(info));
      let models = require('./app/models');
      return models.init();
    }).then(info => {
      console.log('Starting Test Server ', chalk.blue(info));
      return require('./app/app');
    }).catch(error => {
      console.trace(chalk.red(error));
      console.trace(chalk.red(error.message));
      return Promise.reject(error);
    });

  }
}

process.on('uncaughtException', error => {
  console.trace(error.stack);
});


module.exports = TestFactory;
