// Array to store the sequence of colors generated by the game
var gamePattern = [];
// Array to store the sequence of colors clicked by the user
var userClickedPattern = [];
// Possible button colors
var buttonColours = ["red", "blue", "green", "yellow"];
// Current level of the game
var level = 0;
// Flag to check if the game has started
var started = false;

// Event listener for button clicks
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id"); // Get the ID of the clicked button
    userClickedPattern.push(userChosenColour); // Add the clicked color to the user's pattern
    playSound(userChosenColour); // Play the corresponding sound
    animatePress(userChosenColour); // Animate the button press
    checkAnswer(userClickedPattern.length-1); // Check the user's answer
});

// Function to generate the next sequence in the game
function nextSequence() {
    userClickedPattern = []; // Reset the user's pattern
    level++; // Increment the level
    $("h1").text("Level " + level); // Update the level title
    var randomNumber = Math.floor(Math.random() * 4); // Fixed to include all four colors
    var randomChosenColour = buttonColours[randomNumber]; // Select a random color
    gamePattern.push(randomChosenColour); // Add the chosen color to the game pattern
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Flash the chosen button
    playSound(randomChosenColour); // Play the corresponding sound
}

// Function to play a sound based on the color name
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); // Create a new audio object
    audio.play(); // Play the sound
}

// Function to animate a button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); // Add the 'pressed' class to the button
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed"); // Remove the 'pressed' class after 100ms
    }, 100);
}

// Event listener for keypress to start the game
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level); // Update the level title
        nextSequence(); // Generate the first sequence
        started = true; // Set the game as started
    }
});

// Event listener for the Start button
$("#start-button").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(this).hide(); // Hide the Start button when the game starts
    }
});

// Event listener for the Restart button
$("#restart-button").click(function() {
    $("#level-title").text("Press A Key to Start");
    $(this).hide(); // Hide Restart button
    $("#start-button").show(); // Show Start button
    startOver(); // Reset game variables
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
    // Check if the most recent user input matches the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // If the user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence(); // Generate the next sequence after 1 second
            }, 1000);
        }
    } else {
        playSound("wrong"); // Play the wrong sound
        $("body").addClass("game-over"); // Add the 'game-over' class to the body
        setTimeout(function() {
            $("body").removeClass("game-over"); // Remove the 'game-over' class after 200ms
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart"); // Update the title to game over
        $("h1").addClass("game-over"); // Add the 'game-over' class to the title
        setTimeout(function() {
            $("h1").removeClass("game-over"); // Remove the 'game-over' class after 200ms
        }, 200);
        $("#restart-button").show(); // Show Restart button
        startOver(); // Reset the game variables
    }
}

// Function to reset the game variables and start over
function startOver() {
    level = 0; // Reset level to 0
    gamePattern = []; // Clear the game pattern
    started = false; // Set the game as not started
}
