/**
 * Created by sridharrajs.
 */

'use strict';

const jwtController = require('../controllers/jwt-controller');

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  const userId = jwtController.decodeToken(token);

  if (!userId) {
    return res.status(401).send({
      errors: {
        msg: 'please login'
      }
    });
  }

  req.uid = userId;
  next();
}

module.exports = authenticate;
