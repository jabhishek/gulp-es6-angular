var User = require("../models/user.model");
var express = require("express");
var router = express.Router();
var controller = require("./userController")(User);

// routes
router.get('/', controller.index);
router.get('/:id', controller.findById);
router.post('/', controller.create);
router.post('/deleteAll', controller.deleteAll);
router.post('/delete/:id', controller.deleteById);

module.exports = router;
