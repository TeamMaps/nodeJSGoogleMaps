var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')


var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
var connection = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'team3password',
    database: 'mydb'
});
connection.connect();

app.post('/server',function(req,res){
   for(x in req.body)
   console.log(req.body[x]);
});
//app.get('/server',function(req,res){
//     connection.query('INSERT INTO markeri (lat, lng, content) VALUES (?,?,?)',
//                 [req.query.lat,req.query.lng,req.query.content], function(err, result)
//     {
//     if (!err) { res.send(204,[req.query.lat,req.query.lng,req.query.content]); }
//     else { throw err; }           
//     });
//});
app.get('/', function (req, res) {
    
    app.use(express.static('public'));
   res.sendFile('index.html', {root: __dirname});
    
});

        
app.listen(8080);