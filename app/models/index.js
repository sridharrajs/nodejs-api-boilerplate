/**
 * Created by sridharrajs
 */

const requireDir = require('require-dir');

class Models {

  static init() {
    requireDir('./');
    return Promise.resolve('SUCCESS');
  }

}

module.exports = Models;
