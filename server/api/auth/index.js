var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var hasher = require("../user/hasher");
var User = require("../models/user.model");
var express = require("express");
var router = express.Router();
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

passport.use(new LocalStrategy({
		usernameField: 'userid',
		passwordField: 'password'
	},
	authenticateUser
));



// routes
router.post('/login', function (req, res, next) {
	if (req.body.userid && req.body.password) {
		passport.authenticate('local', function (err, user, info) {
			var error = err || info;
			if (error) return res.json(401, error);
			if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

			var token = signToken(user._id, user.role);
			//var token = 'abc';
			res.status(200).json({token: token});
		})(req, res, next)
	} else {
		return res.status(401).json({message: 'User credentials not passed.'});
	}
});

module.exports = router;
