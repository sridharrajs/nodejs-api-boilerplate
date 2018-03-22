/**
 * Created by sridharrajs.
 */

'use strict';

let jwt = require('jwt-simple');

let config = require('../../config');

function expiresIn(numDays) {
  let dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

class JWTController {

  static generateToken(userId) {
    let expires = expiresIn(7);
    return jwt.encode({
      exp: expires,
      data: userId
    }, config.secret);
  }

  static decodeToken(token) {
    if (!token) {
      return null;
    }
    
    try {
      return jwt.decode(token, config.secret);
    } catch (err) {
      console.log('err ', err.stack);
    }
  }

}

module.exports = JWTController;
