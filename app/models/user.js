/**
 * Created by sridharrajs.
 */

'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  email: {
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  gravatar_url: {
    type: String,
    required: true
  },
  created_at: {
    select: false,
    type: Date,
    default: Date.now
  },
  updated_at: {
    select: false,
    type: Date,
    default: Date.now
  }
});

mongoose.model('user', schema);

module.exports = schema;