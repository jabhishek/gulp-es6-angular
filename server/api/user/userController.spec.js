// use strict is required to make let keyword work
"use strict";

var MockUser = function () {
};
MockUser.prototype.save = function () {
  "use strict";
  console.log("original save");
};
MockUser.find = function (condition, select, cb) {
  console.log("original find");
  cb();
};

var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
let usersController = require("./userController")(MockUser);

describe("usersController", function () {
  "use strict";
  var req, res, err, statusCode, sentData;
  var sandbox;
  beforeEach(function () {
    res = {
      json: function (resp) {
        err = resp.err;
        sentData = resp;
      },
      status: function (status) {
        statusCode = status;
        return this;
      }
    };

    statusCode = null;
    err = null;
    sentData = null;
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('index', function () {
    it("should be defined", function () {
      expect(usersController.index).to.exist;
    });

    it("should give results back if no error on find", function () {
      // Arrange
      var results = [{name: 'Abhi'}];
      var find = function (condition, select, cb) {
        cb(null, results);
      };
      sandbox.stub(MockUser, "find", find);

      // Act
      usersController.index(null, res);

      // Assert
      expect(statusCode).to.equal(200);
      expect(sentData).to.equal(results);
      expect(MockUser.find.called).to.be.true;
    });

    it("should give give 500 error if find method errors", function () {
      // Arrange
      var find = function (condition, select, cb) {
        cb("Error");
      };
      sandbox.stub(MockUser, "find", find);

      // Act
      usersController.index(null, res);

      // Assert
      expect(statusCode).to.equal(500);
      expect(err).to.equal('Error in finding tasks');
      expect(MockUser.find.called).to.be.true;
    });
  });

  describe('create', function () {
    var validUser = {
      name: 'A',
      email: 'email',
      userid: 'user',
      password: 'a'
    };
    it("should be defined", function () {
      expect(usersController.create).to.exist;
    });

    it("should save user", function () {
      // Arrange
      var save = function (cb) {
        cb(null);
      };
      sandbox.stub(MockUser.prototype, "save", save);
      req = {
        body: validUser
      };

      // Act
      usersController.create(req, res);

      // Assert
      expect(statusCode).to.equal(200);
      expect(MockUser.prototype.save.called).to.be.true;
    });

    it("should return 500 if user not saved successfully", function () {
      // Arrange
      var save = function (cb) {
        cb("error");
      };
      sandbox.stub(MockUser.prototype, "save", save);
      req = {body: validUser};

      // Act
      usersController.create(req, res);

      // Assert
      expect(statusCode).to.equal(500);
      expect(err).to.equal('Error saving user');
      expect(MockUser.prototype.save.called).to.be.true;
    });

    it("should not save if no user passed", function () {
      // Arrange
      sandbox.spy(MockUser.prototype, "save");
      req = {body: {}};

      // Act
      usersController.create(req, res);

      // Assert
      expect(statusCode).to.equal(400);
      expect(err).to.equal("Bad request - No user passed");
      expect(MockUser.prototype.save.called).to.be.false;
    });
  });
});