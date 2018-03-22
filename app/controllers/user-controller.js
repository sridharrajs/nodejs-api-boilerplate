/**
 * Created by sridharrajs on 2/3/16.
 */

'use strict';

let mongoose = require('mongoose');
let gravatar = require('nodejs-gravatar');

let User = mongoose.model('user');

class UserController {

  static add(item) {
    let user = new User({
      email: item.email,
      password: item.password,
      gravatar_url: gravatar.imageUrl(item.email)
    });
    return user.save();
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
