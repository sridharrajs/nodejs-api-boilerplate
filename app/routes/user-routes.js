/**
 * Created by sridharrajs.
 */

'use strict';

const bcrypt = require('bcrypt-nodejs');
const express = require('express');

let userController = require('../controllers/user-controller');
let jwtController = require('../controllers/jwt-controller');
let security = require('../middleware/auth-filter');

function signUp(req, res) {
  let {email, password} = req.body;

  userController.add({
    email: email,
    password: bcrypt.hashSync(password)
  }).then((user) => {
    return res.status(200).send({
      msg: 'User created successfully!',
      token: jwtController.generateToken({
        userId: user._id
      }),
      profile_url: user.gravatar_url
    });
  }).catch(() => {
    return res.status(500).send();
  });
}

function login(req, res) {
  let {email, password} = req.body;

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
      token: jwtController.generateToken({
        userId: userObj._id
      }),
      profile_url: userObj.gravatar_url
    });
  }).catch((msg) => {
    return res.status(403).send({
      msg: msg
    });
  });
}

function changePassword(req, res) {
  let {email, password, new_password} = req.body;

  if (password === new_password) {
    return res.status(200).send({
      msg: 'New and the current password cant be the same'
    });
  }

  userController.getUserByEmail(email).then((userObj) => {
    let saltedPwd = userObj.password;
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, saltedPwd, (err, isEqual) => {
        if (!isEqual) {
          return reject('Invalid password');
        }
        return resolve(userObj);
      });
    });
  }).then(() => {
    return userController.updatePassword({
      email: email,
      password: bcrypt.hashSync(new_password)
    });
  }).then((userObj) => {
    return res.status(200).send({
      token: jwtController.generateToken({
        userId: userObj._id
      }),
      profile_url: userObj.gravatar_url
    });
  }).catch((msg) => {
    return res.status(403).send({
      msg: msg
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

let validator = [
  require('../middleware/validator/user-signup-validator'),
  require('../middleware/validator/email-validator')
];

let loginValidator = [
  require('../middleware/validator/email-exist-validator')
].concat(validator);

app.post('/signup', validator, signUp);
app.post('/login', loginValidator, login);

app.get('/me', [security], getMyDetails);
app.post('/me/reset_password', loginValidator, changePassword);

module.exports = (indexApp) => {
  indexApp.use('/users', app);
};
