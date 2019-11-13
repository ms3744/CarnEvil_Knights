$(document).ready(function() {



    var canvas = $('#myCanvas');

    //ON LOADING - The div will be of color black and it will display text to begin game
    $(canvas).css('background-color', 'black');
    $(canvas).html('<div id="login"><form action="auth" method="POST"><p> Enter your username <input type="text" name="username" required></p> <p> Enter your password <input type="text" name="password" required></p></div><input type="submit" id = "begin" name="Begin Game">Begin Game</button></form>');

    //The 'Begin Game' text will grow on hover to entice user to click and begin the game
    $('#begin').hover(
        function() {
            $(this).animate({ fontSize: '100px' }, 1000);
        },
        function() {
            $(this).animate({ fontSize: '70px' }, 1000);
        },
    );

    $("#begin").click(function() {
        //Changing the screen       
        $(canvas).replaceWith('<div id="myCanvas"> <p id = "scoreboard"> <span> <b> Score </b> : <span id = "score"> </span> <span> <b> Speed </b> : <span id = "speed"> </span> </span> </p> <div id = "knight"> </div> <div id = "grave">  </div> </div>');


        //Variables
        var gameArena = $('#myCanvas');
        gameArena.addClass('animate-area');
        var knight = $('#knight');
        var grave = $('#grave');
        var scoreWrite = $('#score');



        //important metrics
        var grave_initial_position = 800;
        var speed = 6;
        var knight_position = parseInt(knight.css('left'));
        var change_position = -10;
        var isJumping = false;
        var score = -1;
        var hasBeenScored = false;
        var ghostsEntered = false;
        var hasBeenScored_ghost = false;
        var speedWrite = $('#speed');
        var jumpSpeed = 1100;
        var slashSound;
        var jumpsound = document.getElementById('jumpsound');
        var slashSound = document.getElementById('slashsound');


        var level1 =
            setInterval(function() {
                    var grave_current_position = parseInt(grave.css('left'));
                    var grave_random = Math.floor(Math.random() * 500);
                    var ghost_current_position = 0;
                    var knight_height = parseInt(knight.css('top'));


                    //COLLISION DETECTION
                    if ((grave_current_position < 0 || (ghost_current_position < 0)) && knight_height > (-90)) {
                        // knight.css('visibility', 'hidden');
                        console.log('GAME OVER');
                        game_over();
                    } else {
                        //Updating score 
                        //we check if it has been scored already so that it doesnt add to the score for every time it passes the first condition
                        if (grave_current_position < 15 && hasBeenScored == false) {
                            hasBeenScored = true;
                            score++;
                            if (score > -1)
                                scoreWrite.html(score);
                        }


                        //if it passes the div it must come back on the other side
                        if (grave_current_position < change_position) {
                            //it has not been score yet for this grave
                            hasBeenScored = false;
                            grave_current_position = grave_initial_position + grave_random;
                            console.log("Grave new position :" + grave_current_position);
                        }



                        //Adding
                        if (score > 5) {
                            console.log("checking if score is > 5");
                            //only 5 right now for -+debugging

                            if (ghostsEntered == false) {
                                gameArena.append("<div id = 'ghost'> </div>");
                                ghostsEntered = true;
                                console.log("ghost added");
                            }


                            var ghost = $('#ghost');
                            // making the ghost appear


                            //var speed = 5;
                            var ghost_initial_position = 800;
                            var ghost_random = Math.floor(Math.random() * 1000);
                            // var change_position_ghost = -10; 
                            // var score = 0; 


                            //var the_ghost = setInterval(function (){

                            ghost_current_position = parseInt(ghost.css('left'));

                            //to keep the ghost within the canvas   
                            if (ghost_current_position < 15 && hasBeenScored_ghost == false) {
                                hasBeenScored_ghost = true;
                                score++;
                                scoreWrite.html(score);
                                //speed = speed+1;

                            }
                            if (ghost_current_position < change_position && hasBeenScored_ghost == true) {

                                hasBeenScored_ghost = false;
                                ghost_current_position = ghost_initial_position + ghost_random;
                                console.log("New Position " + ghost_current_position);
                                ghost.css('visibility', 'visible');

                            }



                            ghost.css('left', ghost_current_position - speed); //move the ghost 
                            //}, 4000);   


                            ghost.click(function(event) {
                                console.log("Ghost clicked");
                                //score++;
                                ghost.css('visibility', 'hidden');
                            });


                            $(document).keydown(function(event) {
                                var soundFlag = true;
                                //To slash ghosts at the right position
                                if (event.keyCode == 39 && ghost_current_position < 230 && ghost_current_position > 100) {
                                    ghost.css('visibility', 'hidden');
                                    if (soundFlag) {
                                        slashsound.pause();
                                        slashsound.currentTime = 0;
                                        slashsound.play();
                                        soundFlag = false;
                                    }
                                } else {
                                    console.log('GAME OVER');
                                    game_over();
                                }
                            });

                        }

                        if (ghost_current_position < 15 && hasBeenScored_ghost == false) {
                            hasBeenScored_ghost = true;
                            score++;
                            scoreWrite.html(score);
                            //speed = speed+1;

                        }


                        //The grave passes through
                        grave.css('left', grave_current_position - speed);

                        speed += 0.001;
                        speedWrite.html(Math.floor(speed));
                    }


                },
                40);

        $(document).on('keydown', function(e) {
            var soundFlag = true;
            var key = e.keyCode;
            if (key === 32) { //SPACE BAR
                knight.animate({ top: '-=200%' }, jumpSpeed);
                knight.animate({ top: '+=200%' }, jumpSpeed + 100);
            }

            isJumping = true;
            //adding sound effect for jumping 
            if (soundFlag) {
                jumpsound.pause();
                jumpsound.currentTime = 0;
                jumpsound.play();
                soundFlag = false;
            }
            jumpSpeed += 0.001;
        });




        function game_over() {
            clearInterval(level1);
            gameArena.replaceWith('<div id = "myCanvas" > </div>');
            $('#myCanvas').css('background-color', 'black');
            if (score > 0)
                score--;
            $('#myCanvas').html('<p id = "finalDisplay"> Game Over, you could not save the carnival! <br> Score : ' + score + ' <br> Speed : ' + Math.floor(speed) + ' </p> <button id = "beginAgain"> Play Again </button>');

            $('#beginAgain').click(function() {
                location.reload(); //reloads the page on restarting
            });
        }


    });
});