var colors=["red","blue","green","yellow"];

var gamePattern=[];
var userpattern=[];
var started=false;
var level=0;
var counter=0;

$(document).keypress(function(){
  if(!started){
    started=true;
    newSequence();
  }
});


function newSequence(){
  userpattern=[];
  var randomNumber=Math.floor(Math.random()*4);
  var randomColor=colors[randomNumber];
  gamePattern.push(randomColor);
  console.log(gamePattern);

  level++;
  $("#level-title").text("Level " + level);
  $("#"+randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}



$(".btn").click(function(){
  if(started){
    var colorpressed=$(this).attr("id");
    userpattern.push(colorpressed);
    animatepress(colorpressed);
    console.log(userpattern);
    checkAnswer(userpattern.length-1,colorpressed);
  }
});




function checkAnswer(currentlength,currentColor){
  console.log(currentlength,gamePattern[currentlength],userpattern[currentlength]);
    if(gamePattern[currentlength]===userpattern[currentlength]){
      console.log("success");
      playSound(currentColor);
      if(gamePattern.length===userpattern.length){
        setTimeout(function(){newSequence()
        },1000);
      }
    }
    else{
      console.log("nope");
      playSound("wrong");
      startOver();


    }
}


function animatepress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function playSound(currentColor){
  var audio = new Audio("sounds/" + currentColor + ".mp3");
  audio.play();
}


function startOver(){
  gamePattern=[]
  userpattern=[]
  started=false;
  $("#level-title").text("Game Over,Press any key to play again");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")
  },2000);
}