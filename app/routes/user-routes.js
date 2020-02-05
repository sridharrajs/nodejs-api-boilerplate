/**
 * Created by sridharrajs.
 */

const bcrypt = require('bcrypt-nodejs');
const generator = require('generate-password');
const uuidv4 = require('uuid/v4');

const router = require('express').Router();

const emailController = require('../controllers/email-controller');
const jwtController = require('../utils/jwt-utils');
const userController = require('../controllers/user-controller');

const validator = require('../middleware/validator/user-validator');

function signUp(req, res) {
  const {email, password} = req.body;
  const verificationHash = uuidv4();

  userController.add({
    email,
    password: bcrypt.hashSync(password),
    verification_hash: verificationHash
  }).then((user) => {

    emailController.sendWelcomeEmail(user.email, verificationHash);

    return res.status(200).send({
      msg: 'User created successfully!',
      token: jwtController.generateToken({
        userId: user._id
      }),
      profile_url: user.gravatar_url,
      is_email_verified: user.is_email_verified,
      is_password_change_required: user.is_password_change_required
    });
  }).catch((err) => {
    console.log('err', err);
    return res.status(500).send({
      errors: {
        msg: err.message,
      }
    });
  });
}

function login(req, res) {
  const {email, password} = req.body;

  userController.getUserByEmail(email).then((userObj) => {
    const saltedPwd = userObj.password;
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, saltedPwd, (err, isEqual) => {
        if (!isEqual) {
          return reject(new Error('Invalid email/password'));
        }
        return resolve(userObj);
      });
    });
  }).then((userObj) => {
    return res.status(200).send({
      token: jwtController.generateToken({
        userId: userObj._id
      }),
      profile_url: userObj.gravatar_url,
      is_email_verified: userObj.is_email_verified,
      is_password_change_required: userObj.is_password_change_required,
    });
  }).catch((err) => {
    return res.status(403).send({
      errors: {
        msg: err.message,
      }
    });
  });
}

function resetPassword(req, res) {
  const {email} = req.body;

  userController.getUserByEmail(email).then((user) => {
    if (!user) {
      return res.status(200).send({
        is_account_exist: false,
        msg: 'If the email was a signed up user account, you will receive an email with the temporary password.'
      });
    }

    const tempPassword = generator.generate({
      length: 8,
      numbers: true,
      uppercase: true,
      strict: true
    });

    userController.updateTemporaryPassword({
      id: user._id,
      password: bcrypt.hashSync(tempPassword)
    });

    return res.status(200).send({
      is_account_exist: true,
      msg: 'Please check your inbox for the temporary password'
    });
  }).catch((err) => {
    console.log('err', err.stack);
    return res.status(500).send({
      errors: {
        msg: 'error in resetting password for user',
      },
    });
  });
}

router.post('/signup', validator, signUp);
router.post('/login', validator, login);
router.post('/reset-password', resetPassword);

module.exports = router;
