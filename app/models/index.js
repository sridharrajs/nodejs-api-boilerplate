/**
 * Created by sridharrajs
 */

'use strict';

let requireDir = require('require-dir');

class Models {

  static init() {
    requireDir('./');
    return Promise.resolve('Success');
  }
  
}
module.exports = Models;