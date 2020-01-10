/**
 * Created by sridharrajs
 */



const requireDir = require('require-dir');

class Models {

  static init() {
    requireDir('./');
    return Promise.resolve('Success');
  }

}

module.exports = Models;
