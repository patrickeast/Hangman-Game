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
var newGame;
var playGame;
var lettersWrong = [];
var lettersRight = [];
var guessesRemaining = 4;
var changeWins = 0;
var changeLosses = 0;
var matchingLetter = [];

//FUNCTIONS//
//Background Audio//
window.onload = function (startOver) {
    document.getElementById("bg-audio").play();
    newGame();


}

//New Game
function newGame() {
    // Reset values //
    matchingLetter = [];
    guessesRemaining = 4;
    //Show wins and GuessesRemaining
    document.getElementById("changeWins").innerHTML = "Wins: " + changeWins;
    document.getElementById("descriptor").innerHTML = "Choose wisely. You have " + guessesRemaining + " guesses remaining.";
    document.getElementById("guessesRemaining").innerHTML = "Guesses Remaining: " + guessesRemaining;

    // Run computerChoice to generate a word//
    computerChoice = activeWord[Math.floor(Math.random() * activeWord.length)];
    console.log(computerChoice);

    // Create an array out of computerChoice//
    for (var i = 0; i < computerChoice.length; i++) {
        computerChoiceLetters.push(computerChoice.charAt(i));
        console.log(computerChoiceLetters);
    }

    // Insert underscores for every letter
    for (var j = 0; j < computerChoiceLetters.length; j++) {
        var newUl = document.createElement("li");
        var placeHolder = document.createTextNode("_");
        newUl.appendChild(placeHolder);
        document.getElementById("letterBlanks").appendChild(newUl);
    }

    playGame();
}

// Function to remove all Child elements
function removeChildElements(rootEl) {
    while (rootEl.firstChild) {
        rootEl.removeChild(rootEl.firstChild);
    }
}

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
    document.getElementById("lettersRight").append(userGuess);
    document.getElementById("resultCorrect").innerHTML = " Good guess! "
    var letterBlanksList = document.getElementById("letterBlanks");
    var letterBlanksItems = letterBlanksList.getElementsByTagName("li");
    for (var i = 0; i < computerChoiceLetters.length; i++) {
        if (computerChoiceLetters[i] == userGuess) {
            letterBlanksItems[i].innerHTML = userGuess;
            matchingLetter[i] = userGuess;
        }
    }
    if (matchingLetter.toString() === computerChoiceLetters.toString()) {
        displayWinner();
    }
}

function incorrectGuess() {
    guessesRemaining = guessesRemaining - 1;
    console.log("That's not one of the letters.");
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
    document.getElementById("resultDuplicate").innerHTML = " Whoops. That letter has already been chosen. ";
    playGame();
}


function displayWinner() {
    // alert("Good job, traveler. The prisoner has been executed.")
    console.log("You are a winner!");
    changeWins = changeWins + 1;
    document.getElementById("changeWins").append(changeWins);
    removeChildElements(document.getElementById("resultDuplicate"));
    removeChildElements(document.getElementById("resultCorrect"));
    removeChildElements(document.getElementById("resultIncorrect"));
    document.getElementById("resultWinner").innerHTML = " Good job traveler! The prisoner has been executed. ";
    removeChildElements(document.getElementById("letterBlanks"));
    removeChildElements(document.getElementById("lettersWrong"));
    removeChildElements(document.getElementById("lettersRight"));
    newGame();
}

function displayLoser() {
    console.log("The prisoner got away...");
    removeChildElements(document.getElementById("guessesRemaining"));
    document.getElementById("guessesRemaining").append("Guesses Remaining: " + guessesRemaining);
    removeChildElements(document.getElementById("resultDuplicate"));
    removeChildElements(document.getElementById("resultCorrect"));
    removeChildElements(document.getElementById("resultIncorrect"));
    removeChildElements(document.getElementById("letterBlanks"));
    document.getElementById("resultLoser").innerHTML = "The prisoner got away...";
    removeChildElements(document.getElementById("lettersWrong"));
    removeChildElements(document.getElementById("lettersRight"));
    startOver();
}

// function startOver() {
//     document.getElementById("resetButton").innerHTML("Try again?");
//     newGame();
// }


