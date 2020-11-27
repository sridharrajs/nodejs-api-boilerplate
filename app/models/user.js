/**
 * Created by sridharrajs.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
    type: String
  },
  verification_hash: {
    type: String
  },
  password: {
    required: true,
    type: String
  },
  is_password_change_required: {
    type: Boolean,
    default: false
  },
  is_email_verified: {
    type: Boolean,
    default: false
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
