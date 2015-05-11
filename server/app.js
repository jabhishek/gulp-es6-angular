"use strict";

var express = require('express');
var path = require("path");
var morgan = require('morgan');
var bodyParser = require('body-parser');
var port = process.env.PORT || 9000;

// test let support
let rootPath = path.normalize(__dirname + '/..');
var appPath;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('connected');
});

if (app.get("env") === "development") {
 //   app.use(morgan('dev'));
    app.use(require('connect-livereload')());
    appPath = path.join(rootPath, 'client');
}

app.use(express.static(appPath));
app.set("appPath", appPath);
require("./routes")(app);

app.listen(port, function () {
    console.log('Listening on port ' + port + " in mode: " + app.get("env"));
});



