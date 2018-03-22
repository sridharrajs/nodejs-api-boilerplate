/**
 * Created by sridharrajs.
 */

'use strict';

let jwtController = require('../controllers/jwt-controller');

function authenticate(req, res, next) {
  let token = req.headers.authorization;

  let userId = jwtController.decodeToken(token);
  if (!userId) {
    return res.status(401).send({
      msg: 'please login'
    });
  }

  req.uid = userId;
  next();
}

module.exports = authenticate;