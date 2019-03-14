'use strict';

const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt-nodejs');

const security = require('../middleware/auth-filter');
const userController = require('../controllers/user-controller');
const jwtController = require('../controllers/jwt-controller');

function getMyDetails(req, res) {
  const userId = req.uid;
  userController.getUserByUserId(userId).then(user => {
    return res.status(200).send({
      data: user
    });
  }).catch((err) => {
    return res.status(500).send({
      msg: err
    });
  });
}

function changePassword(req, res) {
  const {email, password, new_password} = req.body;

  if (password === new_password) {
    return res.status(200).send({
      msg: 'New and the current password cant be the same'
    });
  }

  userController.getUserByEmail(email).then(userObj => {
    const saltedPwd = userObj.password;
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
  }).then(userObj => {
    return res.status(200).send({
      token: jwtController.generateToken({
        userId: userObj._id
      }),
      profile_url: userObj.gravatar_url
    });
  }).catch(msg => {
    return res.status(403).send({
      msg: msg
    });
  });
}

app.get('/', security, getMyDetails);
app.post('/reset_password', security, changePassword);

module.exports = app;
