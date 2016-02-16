/**
 * Created by sridharrajs.
 */

'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
	emailId: {
		required: true,
		type: String
	},
	password: {
		required: true,
		type: String
	},
	profile_url: {
		type: String,
		required: true
	},
	joined_at: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('user', schema);

const ATTRIBUTES = [
	'_id',
	'emailId',
	'password',
	'profile_url',
	'joined_at'
];

function getAttributes() {
	return ATTRIBUTES;
}

const PUBLIC_ATTRIBUTES = [
	'emailId',
	'profile_url'
];

function getPublicAttributes() {
	return PUBLIC_ATTRIBUTES;
}

module.exports = {
	getAttributes,
	getPublicAttributes
};