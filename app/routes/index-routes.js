/**
 * Created by sridharrajs.
 */

'use strict';

let express = require('express');
let app = express.Router();

let userController = require('../controllers/user-controller');

function index(req, res) {
  return res.status(200).send({
    msg: 'Server is up!'
  });
}

function verify(req, res) {
  let appName = process.env.APP_NAME;

  let verificationHash = req.query.token;
  if (!verificationHash) {
    return res.render('incorrect', {
      $APP_NAME$: appName
    });
  }

  userController.getByVerificationHash(verificationHash).then(user => {
    if (!user) {
      return res.render('incorrect', {
        $APP_NAME$: appName
      });
    }

    if (user.verification_hash === verificationHash) {
      userController.verifyCustomEmailUser(user._id).then(() => {
        return res.render('verified', {
          $APP_NAME$: appName
        });
      });
    } else {
      return res.render('incorrect', {
        $APP_NAME$: appName
      });
    }

  }).catch(err => {
    console.log('err', err);
    return res.render('error');
  });
}

app.get('/', index);
app.get('/verify', verify);

module.exports = app;
