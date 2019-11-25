/*  
    This is the JS file attached to the game file (gamebegin.html)
    It is written using JQuery
    
    The purpose of this file is to create an interactive game
    This serves for the client side, that is, only related to the gamer
*/

$(document).ready(function(){

    var gameArena = $('#myCanvas');                         //Game Area
    gameArena.addClass('animate-area');                     //To animate game background 
    var knight = $('#knight');                              //Selector for knight
    var grave = $('#grave');                                //Selector for grave
    var scoreWrite = $('#score');                           //Selector to write the score on HTML
    var speedWrite = $('#speed');                           //Selector to write the speed on HTML
    var jumpsound = document.getElementById('jumpsound');   //Selector for sound for jumping
    var slashSound = document.getElementById('slashsound'); //Selector for sound for slashing the ghosts
    jumpsound.volume = 0.1;                                 //Setting the volume for the jumping and slashing
    slashSound.volume = 0.1;
    var socket = io();                                      //For socket.io
    var username;                                           //Storing the username 
    var password;                                           //Storing the password (Encrypted)

    socket.on('user-details-client', function(uname, pwd){
        username = uname;
        password = pwd;
    });


    var grave_initial_position = 800 ;                      //Initial position of the grave
    var speed = 6;                                          //Initial speed of the obstacles
    var change_position = -10;                              //The change of position for the obstacles
    var score = 0;                                          //Initial Score 
    var hasBeenScoredGrave = false;                         //To check if the knight is scored for the grave or not
    var ghostsEntered = false;                              //To check if ghosts have entered the game or not
    var hasBeenScoredGhost = false;                         //To check if knight is scored for the ghost or not                               
    var jumpSpeed = 1100;                                   //Initial speed of each jump
    var ghost_current_position = 0;                         //To get the current position of the ghost (since ghost does not exist yet, it is 0)
    


    //Main game function is stored inside the variable gameBegin
    //It has a setInterval function inside which runs indefinitely until a condition breaks it
    //This condition will be the game over condition
    var gameBegin =

        setInterval(function(){

            var grave_current_position = parseInt(grave.css('left'));   //To get the current position of the grave
            var grave_random = Math.floor(Math.random() * 500);         //To get the new random position for the grave
            var knight_height = parseInt(knight.css('top'));            //To get the top position of the knight


            /*
                COLLISION DETECTION (Game Over Condition):
                Here we will check when the grave goes past the knights position 
                AND
                if the knight could still collide with the obstacle

                OTHERWISE
                we continue the game
            */
            if( grave_current_position < 0  && knight_height > (-90) )   {
                
                //To remove the score that got updated for the colliding obstacle
                --score;
                console.log('GAME OVER : You collided with the grave');
                game_over();
            }

            /*
                Updating score from passing graves
                we check if it has been scored already so that it doesnt add to the score for every time it passes the first condition
            */
            if(grave_current_position < 15 && hasBeenScoredGrave == false){
                hasBeenScoredGrave = true;
                score++;
                if(score > -1)
                    scoreWrite.html(score);
            }
    
    
            /*
                if it passes the the position of change (change_position)
                We have make it enter the div again as a loop 
                This way, we only have one div of the grave that travels through the div for the knight to jump above
            */
            if(grave_current_position < change_position){
                //Since its entering as a 'new' grave, it's score check will turn to false 
                //This is because the knight has not been scored for the new grave entering yet
                hasBeenScoredGrave = false;

                //We keep a random new position for the grave to increase complexity of the coming graves
                grave_current_position = grave_initial_position + grave_random;

                //For checking
                console.log("Grave new position :" + grave_current_position);
            }
    
    

            //When the score reaches a certain threshold, we begin adding the ghosts for inccreasing complexity
            //Here the threshold is 3
            if(score > 3){

                /*
                COLLISION DETECTION (Game Over Condition):
                Here we will check when the ghost goes past the knights position 
                AND
                if the knight could still collide with the obstacle

                Here, if the ghost is not scored (that means not slashed yet) it is game over

                OTHERWISE
                we continue the game
                */
                if( ghost_current_position < 0 && hasBeenScoredGhost == false ) {
                    console.log('GAME OVER : The ghost got you');
                    game_over();
                }
                
                //This is a one time check to see if ghosts have been added to the game canvas or not
                if(ghostsEntered == false) {
                    //If the ghosts have not been added, it will append the ghost div to the HTML
                    gameArena.append("<div id = 'ghost'> </div>");
                    //We change ghostsEntered to true so it does not add more divs
                    ghostsEntered = true;
                    console.log("ghost added"); 
                }

                
                var ghost = $('#ghost');                                            //Selector for the ghost
                ghost_current_position = parseInt(ghost.css('left'));               //Current position of the ghost
                var ghost_initial_position = 800;                                   //Initial position of ghost
                var ghost_random = Math.floor(Math.random() * 100) + 100 + grave_random; //Creating random positions for the ghost
                //We add the random position of the grave as well to avoid having the ghosts and graves come in too close
            

                
                //Similar to the grave, we bring the div back once it reaches a certain position
                if(ghost_current_position < change_position){
                    //We change it back to false for the new entry of the ghost
                    hasBeenScoredGhost = false;
                    //New position for ghost
                    ghost_current_position = ghost_initial_position + ghost_random;
                    //Making the ghost visible again
                    ghost.fadeIn();

                    console.log("Ghost new position : " + ghost_current_position);
                }
                
                                    
                //Moving the ghost  
                ghost.css('left', ghost_current_position - speed); 
            
                //If the user pressed a key, we will now check for slashing the ghost
                $(document).keydown(function(event){
                    //A boolean to check if slashing sound is played or not
                    var soundFlag = true;

                    //We check if it is the right key
                    //If the ghost is close enough
                    //And if the ghost has not been already scored yet for this ghost
                    if(event.keyCode == 39 && ghost_current_position < 300 && hasBeenScoredGhost == false){
        
                        //The ghost is no longer visible (It is slashed)
                        ghost.fadeOut();

                        //Since we are scoring the ghost
                        hasBeenScoredGhost = true;
                        score++;
                        //We update the score on the HTML
                        scoreWrite.html(score); 
                        
                        //We play the slash sound
                        if (soundFlag) {
                            slashsound.currentTime = 0;
                            slashsound.play();
                            soundFlag = false;
                        }
                    } 
                });
            } 

            //The grave passes through
            grave.css('left', grave_current_position - speed);
            
            //We slowly increase the speed
            speed += 0.002;
            speedWrite.html(Math.floor(speed));
    
        }, 40);

    //To check if the space key is pressed to jump
    $(document).on('keydown', function(e){
        //Turning the soundFlag true to play sound
        var soundFlag = true;
        
        //We check if it is the space bar key pressed
        var key = e.keyCode;
        if (key === 32){  //SPACE BAR

            //We animate the knight jumping at the given Jump speed
            knight.animate({top: '-=200%'}, jumpSpeed);
            knight.animate({top: '+=200%'}, jumpSpeed + 100);

            //adding sound effect for jumping 
            if (soundFlag) {
                jumpsound.currentTime = 0;
                jumpsound.play();
                soundFlag = false;
            }
        }

        //We increment the jump speed a little with each jump
        jumpSpeed += 0.002;
    });

    //GAME OVER FUNCTION
    function game_over() {

        //We clear the interval, the game no longer loops on its engine
        clearInterval(gameBegin);

        //We replace the game arena with a black div once again
        gameArena.replaceWith('<div id = "myCanvas" > </div>');
        $('#myCanvas').css('background-color', 'black');

        //This is to update the current score for the user in the data base
        socket.emit('score',score,username);

        //This is to check if the current and display the users highest yet
        socket.on('highest', function(data,message){

            console.log(data + "html");

            //We add to the HTML a final message and the score and the user highest yet
            $('#myCanvas').html('<p id = "finalDisplay"> Game Over! ' + message + ' <br> Score : ' + score + ' <br> Speed : ' + Math.floor(speed) + ' <br> Your Highest : ' + data + '</p> <button id = "beginAgain"> Play Again </button>');

            //If the user clicks on the Play Again, the game reloads
            $('#beginAgain').click(function () {
                //To make sure the server side has the correct username and password
                socket.emit('playingAgain', username, password);
                location.reload(); //reloads the page on restarting
            });
        });

        //This is to check the best score out of all players yet
        socket.on('bestYet', function(u1, sc1, u2, sc2, u3, sc3){

            //If there is only one score available
            if(u2 == undefined)
                $('#myCanvas').append('<table id = "scoreboard_global"> <tr> <th colspan="2">Best Global Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + u1 +'</td> <td>' + sc1 + '</td> </tr> </table>');
            
            //If there are two scores available
            else if(u3 == undefined)
                $('#myCanvas').append('<table id = "scoreboard_global"> <tr> <th colspan="2">Best Global Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + u1 +'</td> <td>' + sc1 + '</td> </tr> <tr> <td>' + u2 + '</td> <td>' + sc2 + '</td> </tr> </table>');
            
            //If top 3 scores are available
            else
                //We display the best score table for all users yet
                $('#myCanvas').append('<table id = "scoreboard_global"> <tr> <th colspan="2">Best Global Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + u1 +'</td> <td>' + sc1 + '</td> </tr> <tr> <td>' + u2 + '</td> <td>' + sc2 + '</td> </tr> <tr> <td>' + u3 + '</td> <td>' + sc3 + '</td> </tr> </table>');
        });

        socket.on('bestNow', function(u1, sc1, u2, sc2, u3, sc3){

            //If there is only one score available
            if(u2 == undefined)
                $('#myCanvas').append('<table id = "scoreboard_active"> <tr> <th colspan="2">Best Active Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + u1 +'</td> <td>' + sc1 + '</td> </tr> </table>');
                        
            //If there are two scores available
            else if(u3 == undefined)
                $('#myCanvas').append('<table id = "scoreboard_active"> <tr> <th colspan="2">Best Active Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + u1 +'</td> <td>' + sc1 + '</td> </tr> <tr> <td>' + u2 + '</td> <td>' + sc2 + '</td> </tr> </table>');
            
            //If top 3 scores are available
            else
                //We display the best score table for all users yet
                $('#myCanvas').append('<table id = "scoreboard_active"> <tr> <th colspan="2">Best Active Scores</th> <tr> <th>Username : </th> <th>Score : </th> </tr> <tr> <td> ' + u1 +'</td> <td>' + sc1 + '</td> </tr> <tr> <td>' + u2 + '</td> <td>' + sc2 + '</td> </tr> <tr> <td>' + u3 + '</td> <td>' + sc3 + '</td> </tr> </table>');
        });
    }
});