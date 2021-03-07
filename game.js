let gamePattern = [];
let userClickedPattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

let started = false;

let level = 0;


$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      }

    } else {

      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over")
      }, 200);

      playSound("wrong");
      $("#level-title").text("Game over, Press Any Key to Restart")

      startOver();

    }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
