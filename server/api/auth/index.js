var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
var express = require("express");
var router = express.Router();
var authService = require('./AuthService');

// routes
router.post('/login', login);

// passport  setup
passport.use(new LocalStrategy({
		usernameField: 'userid',
		passwordField: 'password'
	},
	authService.authenticateUser
));

// authenticate and login
function login (req, res, next) {
	if (req.body.userid && req.body.password) {
		passport.authenticate('local', function (err, user, info) {
			var error = err || info;
			if (error) return res.json(401, error);
			if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

			var token = authService.signToken(user._id, user.role);
			res.status(200).json({token: token});
		})(req, res, next)
	} else {
		return res.status(401).json({message: 'User credentials not passed.'});
	}
}



module.exports = router;
