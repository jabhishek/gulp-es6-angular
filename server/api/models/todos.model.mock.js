var MockTodo = function () {
};
MockTodo.prototype.save = function() {
	"use strict";
	console.log("original save");
};
MockTodo.find = function (condition, select, cb) {
	console.log("original find");
	cb();
};

module.exports = MockTodo;