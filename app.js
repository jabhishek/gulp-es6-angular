var express = require('express');
var port = process.env.PORT || 9000;

var appPath = __dirname;

var app = express();
app.use(express.static(appPath));

app.route('/*')
    .get(function (req, res) {
        res.sendFile(appPath + '/index.html');
    });

app.listen(port, function () {
    console.log('Listening on port ' + port + " in mode: " + app.get("env"));
});