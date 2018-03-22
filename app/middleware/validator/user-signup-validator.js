'use strict';

let _ = require('lodash');

function validateUserInput(req, res, next) {

  for (let attribute of ['email', 'password']) {
    let value = req.body[attribute];

    if (_.size(_.trim(value)) === 0) {
      return res.status(400).send({
        err: `Please enter proper values for ${attribute}!`
      });
    }
  }

  next();

}

module.exports = validateUserInput;