/**
 * Created by sridharrajs.
 */

const jwt = require('jwt-simple');

const config = require('../../config');

function expiresIn(numDays) {
  const dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

class JwtUtils {

  static generateToken(userId) {
    return jwt.encode({
      exp: expiresIn(7),
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
      console.log('err in decodeToken()::JWTController', err.stack);
    }
    return null;
  }

}

module.exports = JwtUtils;
