/**
 * Created by sridharrajs.
 */

'use strict';

const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const express = require('express');
const isValidEmail = require('is-valid-email');
const qs = require('qs');

let userController = require('../controllers/user-controller');
let security = require('../middlewares/auth-filter');

let app = express.Router();

function signUp(req, res) {
  let body = qs.parse(req.body);
  let emailId = body.emailId;
  let password = body.password;

  if (!emailId || !password) {
    return res.status(400).send({
      err: 'Please enter proper values!'
    });
  }
  if (!isValidEmail(emailId)) {
    return res.status(400).send({
      err: 'Please valid emailId'
    });
  }

  let encryptedPwd = bcrypt.hashSync(password);
  let user = {
    emailId: emailId,
    password: encryptedPwd
  };

  userController.add(user, (err, user) => {
    if (err) {
      return res.status(500).send();
    }
    let token = security.generateToken({
      userId: user._id
    });
    return res.status(200).send({
      msg: 'User created successfully!',
      token: token,
      profile_url: user.gravatar_url
    });
  });
}

function login(req, res) {
  try {
    let body = qs.parse(req.body);
    let emailId = body.emailId;
    let password = body.password;

    if (!emailId || !password) {
      return res.status(400).send({
        msg: 'Please enter proper values!'
      });
    }
    if (!isValidEmail(emailId)) {
      return res.status(400).send({
        msg: 'Please valid emailId'
      });
    }
    userController.getUserByCredentials(emailId,  (err, items) => {
      if (err || _.isEmpty(items)) {
        return res.status(403).send({
          msg: 'Invalid emailId/password'
        });
      }
      let userObj = items[0];
      let saltedPwd = userObj.password;
      bcrypt.compare(password, saltedPwd, (err, isEqual) => {
        if (!isEqual) {
          return res.status(403).send({
            msg: 'Invalid emailId/password'
          });
        }
        let userId = userObj._id;
        let token = security.generateToken({
          userId: userId
        });
        res.status(200).send({
          token: token,
          profile_url: userObj.gravatar_url
        });
      });
    });
  } catch (err) {
    console.log('err', err);
  }
}

function getMyDetails(req, res) {
  let userId = req.uid;
  userController.getUserByUserId(userId, (err, items) => {
    if (err) {
      return res.status(500).send({
        msg: err
      });
    }
    return res.status(200).send({
      data: items
    });
  });
}

app.post('/signup', signUp);
app.post('/login', login);
app.get('/me', getMyDetails);

module.exports = (indexApp) => {
  indexApp.use('/users', app);
};
