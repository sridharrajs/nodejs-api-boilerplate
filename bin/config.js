/**
 * Created by sridharrajs on 1/6/16.
 */

const _ = require('lodash');

const ENVS = [
  'production',
  'development',
  'local',
  'test',
];

class Config {

  static shouldSentEmail() {
    return process.env.send_email === 'true';
  }


  static assertEnvironment(dotEnv) {
    const { MY_SECRET, NODE_ENV } = process.env;

    if (!ENVS.includes(NODE_ENV)) {
      return Promise.reject(new Error('Environment is not set'));
    }

    if (!MY_SECRET) {
      return Promise.reject(new Error('Set MY_SECRET in .env file'));
    }

    if (dotEnv.error) {
      return Promise.reject(new Error('.env file is missing'));
    }
    return Promise.resolve('SUCCESS');
  }

  static init() {
    this.port = process.env.PORT;
    this.secure = process.env.SECURE;
    this.mongodbUrl = process.env.MONGODB_URL;
    this.secret = process.env.MY_SECRET;
    return Promise.resolve('SUCCESS');
  }
}

module.exports = Config;
