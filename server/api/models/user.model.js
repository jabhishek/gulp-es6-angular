var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	userid: String,
	name: String,
	email: String,
	hashedPassword: String,
	provider: {type: String, default: 'local'},
	role: {type: String, default: 'parent'},
	salt: String,
	createdOn: {type: Date, default: Date.now}
});

userSchema.pre('save', function(next) {
	"use strict";
	console.log(this);
	console.log('saving...');
	// do stuff - validation, set defaults, etc...
	next();
});


var User = mongoose.model('User', userSchema);

module.exports = User;
