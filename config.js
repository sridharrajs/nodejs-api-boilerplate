/**
 * Created by sridharrajs on 1/6/16.
 */

'use strict';

const _ = require('lodash');

const ENVS = [
  'production',
  'development',
  'local',
  'test'
];

class Config {

  static shouldSentEmail() {
    return process.env.send_email === 'true';
  }


  static isValidEnv(HOST_ENV) {
    return new Promise((resolve, reject) => {
      if (_.includes(ENVS, HOST_ENV)) {
        resolve('Success');
      } else {
        reject({message: 'Failed'});
      }
    });
  }

  static isSecretSet(MY_SECRET) {
    return new Promise((resolve, reject) => {
      if (MY_SECRET) {
        resolve('Success');
      } else {
        reject({message: 'Set MY_SECRET in .env file'});
      }
    });
  }

  static init() {
    this.port = process.env.PORT;
    this.secure = process.env.SECURE;
    this.mongodbUrl = process.env.MONGODB_URL;
    this.secret = process.env.MY_SECRET;
    return Promise.resolve('Success');
  }
}

module.exports = Config;
