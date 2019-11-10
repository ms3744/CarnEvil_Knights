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


app.use(express.static(__dirname + '/client')); //Client //Client
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/indexPERSONAL.html');
    console.log(__dirname + '/client/indexPERSONAL.html'); //Client
});

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




app.post('/auth', urlencodedParser, function(req, res){
 
    var username = req.body.username;
    var password = req.body.password;
    var formdata = req.body.username + " " + req.body.password;

  
    var sql = "INSERT INTO players (Username, Password) VALUES ('"+ username +"','"+password+"');";
       connection.query(sql, function (err, result) {
       if (err) throw err;
       console.log("1 record inserted");
   });

   res.sendFile(__dirname + '/client/gamebegin.html');
});

module.exports = connection;


server.listen(2000);
console.log("This connects to the server");




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

