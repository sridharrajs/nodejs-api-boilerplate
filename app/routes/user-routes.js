/**
 * Created by sridharrajs.
 */

'use strict';

const bcrypt = require('bcrypt-nodejs');
const express = require('express');
const isValidEmail = require('is-valid-email');
const qs = require('qs');

let userController = require('../controllers/user-controller');
let security = require('../middleware/auth-filter');

function signUp(req, res) {
  let body = qs.parse(req.body);
  let email = body.email;
  let password = body.password;

  if (!email || !password) {
    return res.status(400).send({
      err: 'Please enter proper values!'
    });
  }
  
  if (!isValidEmail(email)) {
    return res.status(400).send({
      err: 'Please valid emailId'
    });
  }

  userController.add({
    email: email,
    password: bcrypt.hashSync(password)
  }).then((user) => {
    return res.status(200).send({
      msg: 'User created successfully!',
      token: security.generateToken({
        userId: user._id
      }),
      profile_url: user.gravatar_url
    });
  }).catch(() => {
    return res.status(500).send();
  });
}

function login(req, res) {
  let body = qs.parse(req.body);
  let email = body.email;
  let password = body.password;

  if (!email || !password) {
    return res.status(400).send({
      msg: 'Please enter proper values!'
    });
  }
  
  if (!isValidEmail(email)) {
    return res.status(400).send({
      msg: 'Please valid email'
    });
  }

  userController.getUserByEmail(email).then((userObj) => {
    let saltedPwd = userObj.password;    
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, saltedPwd, (err, isEqual) => {      
        if (!isEqual) {
          return reject('Invalid email/password');
        }
        return resolve(userObj);
      });
    });
  }).then((userObj) => {
    return res.status(200).send({
      token: security.generateToken({
        userId: userObj._id
      }),
      profile_url: userObj.gravatar_url
    });
  }).catch(() => {
    return res.status(403).send({
      msg: 'Invalid email/password'
    });
  });
}

function getMyDetails(req, res) {
  let userId = req.uid;
  userController.getUserByUserId(userId).then((items) => {
    return res.status(200).send({
      data: items
    });
  }).catch((err) => {
    return res.status(500).send({
      msg: err
    });
  });
}

let app = express.Router();
app.post('/signup', signUp);
app.post('/login', login);
app.get('/me', [security], getMyDetails);

module.exports = (indexApp) => {
  indexApp.use('/users', app);
};
