/**
 * Created by sridharrajs.
 */

'use strict';

let jwtController = require('../controller/jwt-controller');

function authenticate(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      msg: 'please login'
    });
  }

  let userId = jwtController.decode(token);
  if (!userId) {
    return res.status(401).send({
      msg: 'please login'
    });    
  }

  req.uid = userId;
  next();
}

module.exports = authenticate;