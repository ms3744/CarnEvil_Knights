console.log("Hello World");

/* Express is used to put the file elements onto the server
 * It will essentially send the request to fetch the HTML document
 * Which will display itself on the server
*/
const express = require('express');
const dataparser = require('body-parser');
const app = express();
const urlencodedParser = dataparser();
var server = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/indexPERSONAL.html');
});


app.use('/client', express.static(__dirname + '/client'));

server.listen(2000);
console.log("This connects to the server");


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'players',
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
// var sql = "create database players";
// //var table = "create table begin";
// connection.query(sql);
//connection.query(table);
module.exports = connection;


app.post('/auth', urlencodedParser, function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var formdata = req.body.username + " " + req.body.password;
    console.log(formdata);
    //res.send(formdata);

    var sql = "INSERT INTO players (Username, Password) VALUES (username, password)";
       connection.query(sql, function (err, result) {
       if (err) throw err;
       console.log("1 record inserted");
   });

   //  if (username && password) {
   // 	connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
   // 		if (results.length > 0) {
   // 			request.session.loggedin = true;
   // 			request.session.username = username;
   // 			response.redirect('/home');
   // 		} else {
   // 			response.send('Incorrect Username and/or Password!');
   // 		}			
   // 		response.end();
   // 	});
   // } else {
   // 	response.send('Please enter Username and Password!');
   // 	response.end();
   // }
});

/* This is to connect socket.io 
 * This will check the connection
 */
var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket) {
    console.log('socket connection');

    socket.on('happy', function(){
        console.log('happy');
    });
});

