var randomNumber;
var level =0;
var buttonColours = ["red","blue","green","yellow"];
var gamePattern= [];
var userClickPattern =[];

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);//generate sequence from 0 -3 
    var randomChosenColour =buttonColours[randomNumber];  
    gamePattern.push(randomChosenColour);
    //console.log(randomNumber);
    //console.log(randomChosenColour);
    //console.log(gamePattern);
    $("#"+gamePattern[gamePattern.length-1]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var name =gamePattern[gamePattern.length-1];
    //console.log(name);
    playSound(name);
    level++;
    $("h1").text("Level "+level+"!");

}
$(".btn").click(handler);


function handler(event){
    var userChosenColour = event.target.id;
    userClickPattern.push(userChosenColour);
    //console.log(userClickPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length-1);
}

function playSound(name){
    var songPlay = new Audio("sounds/"+name+".mp3");
    songPlay.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },150)
        
}
//when keyboard key is pressed
$(document).keypress(function(){
    if (level===0){
        nextSequence();
    }
})
//check answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickPattern[currentLevel]){
        console.log("true");
        if (currentLevel===level-1){
            userClickPattern=[];
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game over,  Press any key to restart.");
        console.log("false");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern=[];
    userClickPattern=[];
}
