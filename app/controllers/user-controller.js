/**
 * Created by sridharrajs on 2/3/16.
 */

'use strict';

let mongoose = require('mongoose');
let gravatar = require('nodejs-gravatar');

let User = mongoose.model('user');

class UserController {

  static getByVerificationHash(verificationHash) {
    return User.findOne({
      verification_hash: verificationHash
    }).lean();
  }

  static updateTemporaryPassword(obj) {
    return User.findOneAndUpdate({
      _id: obj.id
    }, {
      password: obj.password,
      is_password_required: true
    }, {
      upsert: false,
      new: true
    }).catch(err => {
      console.log('err', err);
    });
  }

  static add(data) {
    let user = new User({
      email: data.email,
      password: data.password,
      gravatar_url: gravatar.imageUrl(data.email),
      verification_hash: data.verification_hash
    });
    return user.save().catch(e => {
      if (e.code === 11000) {
        throw new Error('This email has an associated account. Try resetting password, instead?');
      }
    });
  }

  static updatePassword(user) {
    return User.findOneAndUpdate({
      email: user.email
    }, {
      password: user.password
    }, {
      upsert: false,
      new: true
    });
  }

  static verifyCustomEmailUser(id) {
    return User.findOneAndUpdate({
      _id: id
    }, {
      is_email_verified: true
    }, {
      new: false,
      upsert: false
    }).lean();
  }

  static getUserByEmail(email) {
    return User.findOne({
      email: email
    }).lean().exec();
  }

  static getUserByUserId(userId) {
    return User.findById({
      _id: userId
    }).lean().exec();
  }

}

module.exports = UserController;
