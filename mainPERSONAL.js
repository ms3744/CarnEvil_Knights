var ghost = new Image();
 var grave = new Image();
 var knight = new Image();
 var background = new Image();
 
 knight.src = "http://gameartpartners.com/wp-content/uploads/edd/2015/03/Darkness_Knight_Featured.png";
 ghost.src = "https://www.freeiconspng.com/uploads/simple-cartoon-ghost-png-30.png";
 grave.src = "https://cdn.pixabay.com/photo/2014/04/03/11/54/headstone-312540_640.png";
 background.src="https://s3.envato.com/files/234687569/Halloween%20Game%20Background/Halloween%20BG%2002/TileAble%20Halloween%20Background%2002.png";
 
 var canvas = document.getElementById("myCanvas");
 var context = canvas.getContext("2d");
 
gameBegin = function () {
    context.font = "30px EvilFont";
    context.beginPath();
    context.fillRect(0, 0, 800, 500);
    context.fillStyle = "#ffffff";
    context.fillText("Begin Game", 110, 80);
    context.fill();
    context.closePath();

    document.addEventListener("mousedown", draw);

}


//Storing the moves of a grave in an array of classes
 var graves = [];
 graves[0] = {
     x : 200,
     y : 100,
     velocity : 0
 };

 //Moves of a knight
var knightMoves = {
    kX : 5,
    kY : 100,
    jumping : false,
    jumpVelocity : 0
};




//Controller Class
var controller = {
    up: false,

    isItJumping: function(event) {
        var state = (event.type == "keydown") ? true : false;
        switch(event.keyCode) {
            case 32 :                           //32 = space bar //38 = up arrow
            case 38 : controller.up = state;
                      jump();
                      break;
        }
        console.log(controller.up);
    }
};

jump = function() {    

    if(controller.up && knightMoves.jumping == false){
        knightMoves.jumpVelocity -= 60;
        knightMoves.kX += 5;
        knightMoves.jumping = true;
       console.log("Jumping");
    } 

    //Gravity should bring the knight down
    knightMoves.jumpVelocity += 0.5;

    //Knight's position
    knightMoves.kY += knightMoves.jumpVelocity;
    knightMoves.kX += 0.5;

    //Friction and gravity slows it down as well
    
    knightMoves.jumpVelocity *= 0.2;

    if(knightMoves.kY > 100){
        knightMoves.jumping = false;
        knightMoves.velocity = 0;
        knightMoves.kY = 100;
        knightMoves.kX = 10;
    }
    
   
    requestAnimationFrame(jump);
    
} 



draw = function(){
    
    
    
    context.drawImage(background,0,0,981,158);

    for(var i = 0; i < graves.length; i++){
        context.drawImage(grave, graves[i].x, graves[i].y, 50, 50);
        graves[i].x --;
        
        if(graves[i].x == 15) {
                graves.push({
                    x : 260,
                    y : 100
                });
            }            
    }
    
    
    
    context.drawImage(knight, knightMoves.kX,knightMoves.kY, 50,50);

    //The knight is constantly running, but the perspective is fixed on the knight, so the grave appears to come toward the knight 

    
    requestAnimationFrame(draw);
    
}



document.addEventListener("keydown", controller.isItJumping);
document.addEventListener("keyup", controller.isItJumping);


//if the gamer presser up or space bar the knight must jump to avoid the obstacles


 /*
function gameBegins() {
    arena.begin();
}

drawing.onload = function() {
    context.drawImage(background,0,0);
 };

function obstacles() {

}

var arena = {
canvas : document.getElementById("myCanvas"),
context : canvas.getContext("2d"),
begin : function() {
    drawing.onload = function() {
        context.drawImage(background,0,0);
     };
},
updateArena : function() {

},
end : function() {
    arena.context.fillRect(20,20,100,150);
}

} */

/* function setup() {
    var canvas = getElementById("myCanvas");
    var context = canvas.getContext(2d);
    canvas.innerHTML
}

function draw() {

} */ 