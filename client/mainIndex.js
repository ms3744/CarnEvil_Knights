
/*
    This is the JS file attached to the index (Form Web Page) 
    It is written using JQuery
    The purpose of the file is to animate the Begin Game button

    As well as to send a cookie of the user details to the JS file linked to the main game 
*/

$(document).ready(function(){

    //Selector of canvas
    var canvas = $('#myCanvas');

    //ON LOADING - The div will be of color black and it will display text to begin game
    canvas.css('background-color', 'black');

    //The 'Begin Game' text will grow on hover to entice user to click and begin the game
    $('#begin').hover(
        function(){
            $(this).animate({fontSize: '100px'}, 1000);
        },        
        function(){
            $(this).animate({fontSize: '70px'}, 1000);
        },
    );

    var socket = io();
    //On Sign up, the user details are sent as cookies
    $('#signup').submit(function () {
        socket.emit('user_details', $('#username').val(), $('#password').val());
    });    
});