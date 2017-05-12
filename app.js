var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');

var app = express();

app.get('/', function (req, res) {
    app.use(express.static('public'));
    res.sendFile('index.html', { root: __dirname });
});

app.listen(8080);