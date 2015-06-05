var hasher = require("../user/hasher");
var jwt = require('jsonwebtoken');
var User = require("../models/user.model");
var config = require('../../config/environment');

function authenticateUser(userid, password, next) {
	"use strict";
	User.findOne({userid: userid}, '-__v', function (err, user) {
		if (!err && user) {
			var hash = hasher.computeHash(password, user.salt);
			if (hash === user.hashedPassword) {
				next(null, user);
				return;
			} else {
			}
		}
		next(null, false, {message: "Invalid credentials!!"});
	});
}

function signToken(id) {
	return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
}

module.exports = {
	authenticateUser: authenticateUser,
	signToken: signToken
};