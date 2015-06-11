var hasher = require("../user/hasher");
var jwt = require('jsonwebtoken');
var User = require("../models/user.model");
var config = require('../../config/environment');

var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({ secret: config.secrets.session });

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

function isAuthenticated () {
	return compose()
		// Validate jwt
		.use(function (req, res, next) {
			// allow access_token to be passed through query parameter as well
			if (req.query && req.query.hasOwnProperty('access_token')) {
				req.headers.authorization = 'Bearer ' + req.query.access_token;
			}
			validateJwt(req, res, next);
		})
		// Attach user to request
		.use(function (req, res, next) {
			User.findOne({_id: req.user._id}, function (err, user) {
				if (err) return next(err);
				if (!user) return res.send(401);

				req.user = user;
				next();
			});
		});
}

module.exports = {
	authenticateUser: authenticateUser,
	signToken: signToken,
	isAuthenticated: isAuthenticated
};