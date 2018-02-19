//Variables
    var activeWord = [
        "Antero", 
        "Arkansas",
        "Belford",
        "Bross",
        "Columbia", 
        "Elbert", 
        "Evans", 
        "Harvard", 
        "Lincoln", 
        "Massive", 
        "Princeton", 
        "Shavano", 
        "Sherman",
        "Sniktau",
        "Wilson", 
        "Yale", 
    ];
    var computerChoice;
    var computerChoiceLetters = [];
    var newGame;
    var playGame;
    var lettersGuessed = [];
    var lettersWrong = [];
    var lettersRight = [];
    var scoreContainer = 0;
    var guessesRemaining = 4;
    var letterDash = 0;
    var changeWins = 0;
    var changeLosses = 0;
    var displayWinner = false;
    var displayLoser = false;

//FUNCTIONS//
    //Background Audio//
    window.onload = function() {
        document.getElementById("bg-audio").play();
    }

    //intializeGame
    function newGame() {
        // Reset values //
        var lettersGuessed = [];
        var lettersWrong = [];
        var lettersRight = [];
        var displayWinner = false;
        var displayLoser = false;
        var scoreContainer = 0;
        var guessesRemaining = 4;
        var letterDash = 0;
    
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

    function playGame() {
        //Log keystrokes
        document.onkeyup = function(event) {
            userGuess = event.key;

        //Query keystrokes against computerChoice
        if (userGuess === lettersRight) {
            duplicateGuess();
        }
        else if (userGuess !== computerChoiceLetters) {
            incorrectGuess();
        }
        else if (userGuess === lettersRight) {
            correctGuess();
        }
    }
        
    function correctGuess() {

    } 

    function incorrectGuess() {

    }

    function duplicateGuess () {

    }
        //if keystroke === computerChoice, run correctGuess and update in lettersRight, and replace _ with letter.
        //if keystroke !== computerChoice, run incorrectGuess then show keystroke in lettersWrong, change guessesRemaining --1
        //if keystroke === lettersRight, alert "That has already been chosen"
        
    
    newGame();
    
    document.getElementById("changeWins").innerHTML = "Wins: " + changeWins;
    


// given correct guesses Array["a", "f"]

// given current guess
// "r"
// Loop through each letter of the WaveShaperNodeadd undersccore Headersloop through each correct SVGFEGaussianBlurElement if letter is same as current letter of word then replace with letter

// given a word to check against
// "fair"

// given wa word to check against"Fair"

// then show a string with correct WEBGL_compressed_texture_s3tc
// "fa_r"
