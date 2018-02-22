//Variables
var activeWord = [
    "antero",
    "arkansas",
    "belford",
    "bross",
    "columbia",
    "elbert",
    "evans",
    "harvard",
    "lincoln",
    "massive",
    "princeton",
    "shavano",
    "sherman",
    "sniktau",
    "wilson",
    "yale",
];
var computerChoice;
var computerChoiceLetters = [];
var userGuess = [];
var lettersWrong = [];
var lettersRight = [];
var guessesRemaining = 4;
var changeWins = 0;
var changeLosses = 0;
var matchingLetter = [];

//FUNCTIONS//
//Background Audio//
window.onload = function (event) {
    document.getElementById("bg-audio").play();
}

//New Game
function newGame() {
    console.log("newGame has begun");
    // Reset values //
    guessesRemaining = 4;
    document.getElementById("placeholderDiv").innerHTML = "";

    //Show wins and GuessesRemaining
    document.getElementById("resultCorrect", "resultIncorrect", "resultDuplicate", "resultWinner", "resultLoser").innerHTML = "";
    document.getElementById("changeWins").innerHTML = "Wins: " + changeWins;
    document.getElementById("descriptor").innerHTML = "Choose wisely. You have " + guessesRemaining + " guesses remaining.";
    document.getElementById("guessesRemaining").innerHTML = "Guesses Remaining: " + guessesRemaining;

    // Run computerChoice to generate a word//
    computerChoice = activeWord[Math.floor(Math.random() * activeWord.length)];
    console.log("Shh...The answer is " + computerChoice);

    // Create an array out of computerChoice//
    for (var i = 0; i < computerChoice.length; i++) {
        computerChoiceLetters.push(computerChoice.charAt(i));
    }

    // Insert underscores for every letter
    for (var j = 0; j < computerChoiceLetters.length; j++) {
        var newUl = document.createElement("li");
        var placeHolder = document.createTextNode("_");
        newUl.appendChild(placeHolder);
        document.getElementById("placeholderDiv").appendChild(newUl);
    }

    playGame();
}

document.onload = newGame();


//What happens when the game begins
function playGame() {

    //Log keystrokes
    document.onkeypress = function (event) {
        userGuess = event.key;

        //Query keystrokes against computerChoice
        if (userGuess === lettersWrong || userGuess === lettersRight) {
            duplicateGuess();
        } else if (computerChoiceLetters.indexOf(userGuess) > -1) {
            correctGuess();
        } else {
            incorrectGuess();
        }
    }
}




//When the user picks a correct letter
function correctGuess() {
    console.log("That's one of the letters!");
    lettersRight = userGuess;
    document.getElementById("resultIncorrect", "resultDuplicate", "resultWinner", "resultLoser").innerHTML = "";
    document.getElementById("lettersRight").append(userGuess);
    document.getElementById("resultCorrect").innerHTML = " Good guess! "
    var letterBlanksList = document.getElementById("placeholderDiv");
    var letterBlanksItems = letterBlanksList.getElementsByTagName("li");
    for (var i = 0; i < computerChoiceLetters.length; i++) {
        if (computerChoiceLetters[i] == userGuess) {
            letterBlanksItems[i].innerHTML = userGuess;
            matchingLetter[i] = userGuess;
        }
    }
    if (matchingLetter.toString() === computerChoiceLetters.toString()) {
        document.getElementById("placeholderDiv").innerHTML = "";
        displayWinner();
    }
}

function incorrectGuess() {
    console.log("That's not one of the letters.");
    guessesRemaining = guessesRemaining - 1;
    document.getElementById("resultCorrect", "resultDuplicate", "resultWinner", "resultLoser").innerHTML = "";
    lettersWrong = userGuess;
    if (guessesRemaining < 1) {
        document.getElementById("guessesRemaining").innerHTML = "Guesses Remaining: " + (guessesRemaining);
        document.getElementById("descriptor").innerHTML = "Choose wisely. You have " + (guessesRemaining) + " guesses remaining.";
        displayLoser();
    } else {
        document.getElementById("lettersWrong").append(userGuess);
        document.getElementById("guessesRemaining").innerHTML = "Guesses Remaining: " + (guessesRemaining);
        document.getElementById("descriptor").innerHTML = "Choose wisely. You have " + (guessesRemaining) + " guesses remaining.";
        document.getElementById("resultIncorrect").innerHTML = " Umm... That's not right. ";
    }
}

function duplicateGuess() {
    console.log("That letter has already been picked");
    document.getElementById("resultCorrect", "resultIncorrect", 'resultWinner', "resultLoser").innerHTML = "";
    document.getElementById("resultDuplicate").innerHTML = " Whoops. That letter has already been chosen. ";
    playGame();
}


function displayWinner() {
    console.log("You are a winner!");
    changeWins = changeWins + 1;
    document.getElementById("changeWins").append(changeWins);
    document.getElementById("resultCorrect", "resultIncorrect", "resultDuplicate").innerHTML = "";
    document.getElementById("resultWinner").innerHTML = " Good job traveler! The prisoner has been executed. ";
    newGame();
}

function displayLoser() {
    console.log("The prisoner got away...");
    document.getElementById("resultCorrect", "resultIncorrect", "resultDuplicate").innerHTML = "";
    document.getElementById("guessesRemaining").append("Guesses Remaining: " + guessesRemaining);
    document.getElementById("resultLoser").innerHTML = "The prisoner got away...";
    newGame();
}