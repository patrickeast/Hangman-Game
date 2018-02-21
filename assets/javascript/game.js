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
var resultDisplay;

//FUNCTIONS//
//Background Audio//
window.onload = function () {
    document.getElementById("bg-audio").play();
    newGame();


}

//New Game
function newGame() {
    // Reset values //
    lettersWrong = 0;
    lettersRight = 0;
    matchingLetter = [];
    guessesRemaining = 4;
    userGuess = 0;

    //Clear old Letter Tiles and Letters Played lists
    removeChildElements(document.getElementById("letterBlanks"));
    removeChildElements(document.getElementById("lettersWrong"));
    removeChildElements(document.getElementById("lettersRight"));

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

// Removes all Child elements
function removeChildElements(rootEl) {
    while (rootEl.firstChild) {
        rootEl.removeChild(rootEl.firstChild);
    }
}

//What happens when the game begins
function playGame() {
    //Log keystrokes
    document.onkeydown = function (event) {
        userGuess = event.key;

        //Query keystrokes against computerChoice
        if (computerChoiceLetters === userGuess) {
            duplicateGuess();
        }
        else {
            // saveUserGuess();
            if (computerChoiceLetters.indexOf(userGuess) > -1) {
                correctGuess();
            }
            else {
                incorrectGuess();
            }
        }
    }





    function correctGuess() {
        lettersRight = userGuess;
        document.getElementById("lettersRight").append(userGuess);
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
        lettersWrong = userGuess;
        if (lettersWrong >= 4) {
            displayLoser();
        } else {
            document.getElementById("lettersWrong").append(userGuess);
            document.getElementById("guessesRemaining").innerHTML = "Guesses Remaining: " + (guessesRemaining - 1);
            document.getElementById("descriptor").innerHTML = "Choose wisely. You have " + (guessesRemaining - 1) + " guesses remaining.";
            playGame();
        }
    }

    function duplicateGuess() {
        console.log("That letter has already been picked");
    }


    function displayWinner() {
        // alert("Good job, traveler. The prisoner has been executed.")
        console.log("You are a winner!");
        document.getElementById("resultDisplay").innerHTML = " Good job traveler. The prisoner has been executed. ";
        document.getElementById("changeWins").append(changeWins + 1);
        newGame();
    }

    function displayLoser() {
        console.log("The prisoner got away...");
        newgame();
    }
}

// newGame();