var express = require('express');
var path = require("path");
var morgan = require('morgan');
var port = process.env.PORT || 9000;
var rootPath = path.normalize(__dirname + '/..');
var appPath;

var app = express();

if (app.get("env") === "development") {
 //   app.use(morgan('dev'));
    app.use(require('connect-livereload')());
    appPath = path.join(rootPath, 'client');
}

app.use(express.static(appPath));



app.route('/*')
    .get(function (req, res) {
        res.sendFile(appPath + '/index.html');
    });

app.listen(port, function () {
    console.log('Listening on port ' + port + " in mode: " + app.get("env"));
});