'use strict';

const userController = require('../../controllers/user-controller');

function emailExistValidator(req, res, next) {
  const email = req.body.email;


  userController.getUserByEmail(email).then(user => {
    if (!user) {
      return res.status(400).send({
        msg: 'Email id or password is incorrect'
      });
    }

    next();
  }).catch(err => {
    console.log('err', err.stack);
    return res.status(400).send({
      errors: {
        msg: 'Something failed at server, please try again'
      }
    });
  });

}

module.exports = emailExistValidator;
