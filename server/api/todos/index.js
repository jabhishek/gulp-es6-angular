var Todo = require("../models/todos.model");
var express = require("express");
var router = express.Router();
var controller = require("./todosController")(Todo);

function someMiddleWare() {
  "use strict";
  return function(req, res, next) {
    console.log('middleware called');
    next();
  }
}

// routes
router.get('/', someMiddleWare(), controller.index);
router.post('/', controller.create);

module.exports = router;
