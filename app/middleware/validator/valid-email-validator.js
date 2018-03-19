'use strict';

const isValidEmail = require('is-valid-email');

function validateEmail(req, res, next) {
  let {email} = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).send({
      msg: 'Please enter a valid email'
    });
  }

  next();
}

module.exports = validateEmail;