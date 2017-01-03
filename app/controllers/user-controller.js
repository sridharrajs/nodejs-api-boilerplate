/**
 * Created by sridharrajs on 2/3/16.
 */

'use strict';

let mongoose = require('mongoose');
let gravatar = require('nodejs-gravatar');

let User = mongoose.model('user');

class UserController {
  
  static add(item){
    let user = new User({
      email: item.email,
      password: item.password,
      gravatar_url: gravatar.imageUrl(item.emailId)
    });
    return user.save();
  }

  static getUserByEmailId(email) {
    return User.find({
      email: email
    }).exec();
  }
  
  static getUserByUserId (userId) {
    return User.findById({
      _id: userId
    }).exec();
  }
  
}

module.exports = UserController;
