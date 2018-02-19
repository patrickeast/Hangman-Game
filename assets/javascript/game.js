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
var lettersCorrect = [];
var guessesRemaining = 4;
var changeWins = 0;
var changeLosses = 0;
var matchingLetter = [];

//FUNCTIONS//
//Background Audio//
window.onload = function () {
    document.getElementById("bg-audio").play();
    document.getElementById("changeWins").innerHTML = "Wins: " + changeWins;
    newGame();

}

//New Game
function newGame() {
    // Reset values //
    var lettersCorrect = [];
    var lettersWrong = [];
    var matchingLetter = [];
    var computerChoiceLetters = [];
    var guessesRemaining = 4;


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

// Remove child elements
function removeChildElements(rootEl) {
	while ( rootEl.firstChild ) {
		rootEl.removeChild( rootEl.firstChild );
	}
}

//What happens when the game begins
function playGame() {
    //Log keystrokes
    document.onkeydown = function (event) {
        userGuess = event.key;

        //Query keystrokes against computerChoice
        
        if (computerChoiceLetters.includes(userGuess)) {
            duplicateGuess();
        } else {
            // saveUserGuess();
            if (computerChoiceLetters.indexOf(userGuess) > -1) {
                correctGuess();
                console.log("yes");
            } else {
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
            if (computerChoiceLetters[i] === userGuess) {
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
        document.getElementById("lettersWrong").append(userGuess);
        guessesRemaining - 1;
        if (guessesRemaining < 1) {
            displayLoser();
        }
    }

    function duplicateGuess() {
        console.log("That letter has already been picked");
    }


    function displayWinner() {
        document.onkeypress = undefined;
        alert("You win!");
        console.log("You are a winner!");
        changeWins + 1;
        newGame();
    }

    function displayLoser() {
        document.onkeypress = undefined;
        alert("The prisoner got free.");
        console.log("You lose.");
        newGame();
    }
}