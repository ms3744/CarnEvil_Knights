/*
    This is the JS file that acts as the server side of the project
    It is written using NodeJS

    The purpose of this file is to connect the server JS to the client JS 
*/


/* 
    Express is used to put the file elements onto the server
    It will essentially send the request to fetch the HTML document
    Which will display itself on the server

    Socket is used to send objects to and from the the server and client side 

    MySQL is used to connect to the database

*/
const express = require('express');                             //To store express
const dataparser = require('body-parser');                      //To store body-parser, reads the body elements
const app = express();                                          //The main app using express
const urlencodedParser = dataparser();                          //A parser to read the data
var server = require('http').Server(app);                       //To store the server side 
var username;
var password;

//Directory
app.use(express.static(__dirname + '/client')); 

//To send the beginning HTML (The game begin form index.html)
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
    console.log(__dirname + '/client/index.html'); 
});

//To create database connection using mysql
var mysql      = require('mysql');                             
var connection = mysql.createConnection({                       
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'players',
});


//To connect to the data base
connection.connect(function(err){
    //If there is no error in connection, we print the message that the data base is connected
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});


//Form authorization and taking user details from the client HTML (index.html)
app.post('/auth', urlencodedParser, function(req, res){
 
    username = req.body.username;
    password = req.body.password;

    //First we check if the username does exist
    var checkUsername = "SELECT * from players WHERE Username = '" + username + "';";
    connection.query(checkUsername, function(err, result){
        if (err) throw err;

        //If the user does exist
        if(result.length){
            //We check if the user has the same password
            var checkPassword = "SELECT * from players WHERE Password = '" + password + "';";
            
            connection.query(checkPassword, function(err, result){
                if (err) throw err;

                //If it has the same password as well
                if (result.length){
                    console.log("one exists");
                    //We jump to the game HTML
                    res.sendFile(__dirname + '/client/gamebegin.html');
                }

                //Otherwise, we inform its the wrong password and restart the form signup
                else{
                    console.log("Wrong password entered");
                    res.sendFile(__dirname + '/client/index.html')
                }
            });
        }

        //If the user does not exist
        else{
            console.log("none exists");

            //We enter a user entry into our table in the database
            var sql = "INSERT INTO players (Username, Password) VALUES ('"+ username +"','"+password+"');";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
            //We jump to the game HTML
            res.sendFile(__dirname + '/client/gamebegin.html');
        }
    });
});

module.exports = connection;

//Connecting to a server
server.listen(2000);
console.log("This connects to the server");




/* This is to connect socket.io 
 * This will check the connection
 */
var io = require('socket.io')(server,{});

io.sockets.on('connection', function(socket) {
    console.log('socket connection');


    socket.on('playingAgain', function(uname,pwd){
        username = uname;
        password = pwd;
        console.log(username + " " + password);
    });


    //Receiving the current score of the user name to update it in the table
    socket.on('score', function(score,username){
        
        console.log(score);
        
        //To set the score
        var setScore = "UPDATE players SET Current_Score = " + score + " WHERE Username = '" + username + "';"; 
        connection.query(setScore, function (err, result) {
            if (err) throw err;
            console.log(result + " done");
        });

        //To check if the score is the highest score of the user yet yet
        var getHighest = "SELECT Highest_Score from players WHERE Username = '" + username + "';";
        connection.query(getHighest, function(err, result){ 
            if (err) throw err;

            //If it is the highest score yet
            if(score > result[0].Highest_Score){
                //We send the highest score yet with a message
                socket.emit('highest',score, "Congratulations, this is your highest yet!");

                //We update the table to store the highest score of the user as the new score
                var newHighest = "UPDATE players SET Highest_Score = " + score + " WHERE Username = '" + username + "';"; 
                connection.query(newHighest, function(err,res){
                   if (err) throw err;
                   console.log(" Highest updated" + res);
                });
            }

            //If its not their highest yet
            else {
                socket.emit('highest',result[0].Highest_Score, " ");
            }


            //To send the top three scores globally of all time
            connection.query("SELECT Highest_Score, Username from players ORDER BY Highest_Score DESC LIMIT 3", function(err, result){
                if (err) throw err;
                console.log(result);
                socket.emit('bestYet', result[0].Username, result[0].Highest_Score, result[1].Username, result[1].Highest_Score, result[2].Username, result[2].Highest_Score);
            });

            //To send the top three scores globally of all active users
            connection.query("SELECT Highest_Score, Username from players WHERE timestamp > NOW() - INTERVAL 30 MINUTE ORDER BY Highest_Score DESC LIMIT 3", function(err, result){
                if (err) throw err;
                console.log(result);
                socket.emit('bestNow', result[0].Username, result[0].Highest_Score, result[1].Username, result[1].Highest_Score, result[2].Username, result[2].Highest_Score);
            });
        });
    });
});


