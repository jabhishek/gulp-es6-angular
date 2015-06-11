var Todo = require("../models/todos.model");
var auth = require("../auth/AuthService");
var express = require("express");
var router = express.Router();
var controller = require("./todosController")(Todo);

// routes
router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', controller.create);

module.exports = router;

