var hasher = require('./hasher');

var controller = function (User) {
	"use strict";
	var index = function (req, res) {
		"use strict";
		// select everything, but __v
		User.find({}, '-__v', function (err, results) {
			if (!err) {
				res.status(200).json(results);
			} else {
				res.status(500).json({err: 'Error in finding tasks'});
			}
		});
	};

	var findById = function (req, res) {
		"use strict";
		console.log(req.params);
		// returns an array
		// User.find({_id: req.params.id}, '-__v', function (err, results) {

		// findById will, obviously, return just one user, and not an array of users
		// In the below exampls, it will just return name field in the result
		User.findById(req.params.id, 'name -_id', function (err, results) {
			if (!err) {
				res.status(200).json(results);
			} else {
				res.status(500).json({err: 'Error in finding users'});
			}
		});
	};

	var deleteAll = function (req, res) {
		"use strict";
		User.remove(function (err, results) {
			if (!err) {
				res.status(200).json({ data: 'All users deleted'});
			} else {
				res.status(500).json({err: 'Error in deleting users'});
			}
		});
	};

	var deleteById = function (req, res) {
		"use strict";
		User.findByIdAndRemove(req.params.id, function (err, results) {
			if (!err) {
				res.status(200).json({ data: 'user deleted'});
			} else {
				res.status(500).json({err: 'Error in deleting users'});
			}
		});
	};

	var create = function (req, res) {
		"use strict";
		var newUser = req.body;
		if (newUser == null ||
			!newUser.userid ||
			!newUser.password ||
			!newUser.email ||
			!newUser.name) {
			return res.status(400).json({err: 'Bad request - No user passed'});
		}

		var salt = hasher.createSalt(12);
		var user = new User({
			name: newUser.name,
			userid: newUser.userid,
			email: newUser.email,
			salt: salt,
			hashedPassword:  hasher.computeHash(newUser.password, salt)
		});
		user.save(function (err) {
			if (!err) {
				res.status(200).json({
					message: 'created'
				});
			} else {
				res.status(500).json({
					err: 'Error saving user'
				});
			}
		});
	};

	return {
		index: index,
		findById: findById,
		create: create,
		deleteAll: deleteAll,
		deleteById: deleteById
	}
};


module.exports = controller;

