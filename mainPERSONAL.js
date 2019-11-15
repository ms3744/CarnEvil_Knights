$(document).ready(function(){


    var socket = io();
    var username = $('#username');

    var canvas = $('#myCanvas');

    //ON LOADING - The div will be of color black and it will display text to begin game
    $(canvas).css('background-color', 'black');
    //$(canvas).html('');  

    //The 'Begin Game' text will grow on hover to entice user to click and begin the game
    $('#begin').hover(
        function(){
            $(this).animate({fontSize: '100px'}, 1000);
        },        
        function(){
            $(this).animate({fontSize: '70px'}, 1000);
        },
    );

    $('#signup').submit(function () {
        $.cookie('username', $('#username').val());
        $.cookie('password', $('#password').val());
    });

     
});