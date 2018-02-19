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
var scoreContainer = 0;
var guessesRemaining = 4;
var letterDash = 0;
var changeWins = 0;
var changeLosses = 0;
var matchingLetter = [];

//FUNCTIONS//
//Background Audio//
window.onload = function () {
    document.getElementById("bg-audio").play();
    document.getElementById("changeWins").innerHTML = "Wins: " + changeWins;
    document.getElementById("descriptor").innerHTML = "Choose wisely. You have " + guessesRemaining  + " guesses remaining to hang the killer.";
    
    
}

//New Game
function newGame() {
    // Reset values //
    var lettersWrong = [];
    var lettersRight = [];
    var matchingLetter = [];
    var guessesRemaining = 4;
    var userGuess;

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
        // document.getElementById("letterBlanks").innerHTML = "Mount " + newUl;
    }
    document.getElementById("guessesRemaining").innerHTML = "Guesses Remaining: " + guessesRemaining;

    playGame();
}
//What happens when the game begins
function playGame() {
    //Log keystrokes
    document.onkeydown = function (event) {
        userGuess = event.key;

        //Query keystrokes against computerChoice
        if (userGuess.includes(computerChoiceLetters)) {
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
        lettersCorrect = userGuess;
        document.getElementById("lettersCorrect").append(userGuess);
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
        guessesRemaining = guessesRemaining + 1;
        document.getElementById("lettersWrong").append(userGuess);
    }

    function duplicateGuess() {
        console.log("That letter has already been picked");
    }


    function displayWinner() {
        alert("Good job. The prisoner has been executed.")
        console.log("You are a winner!");
        document.getElementById("changeWins").append(changeWins + 1);
    }

    function displayLoser() {
        console.log("The prisoner got away...");
        guessesRemaining -= 1;
    }
}

newGame();