document.addEventListener("DOMContentLoaded", function(){
        
    var sentences = [
        
        { original: "The quick brown fox", jumbled: "ehT kciuq nworb xof" },
        { original: "Jumps over the lazy dog", jumbled: "spmuJ revo eht yzal god" },
        { original: "Fortune favors the bold", jumbled: "eFotrnu srofav eht dlob" },
        { original: "The cat chases the mouse", jumbled: "ehT tac sesahc eht esuom" },
        { original: "Beauty is in the eye of the beholder", jumbled: "taeuyB si ni eht eye fo eht redolheb" },
        { original: "Better late than never", jumbled: "eBtter etla naht revne" },
        { original: "Practice makes perfect", jumbled: "tPractcie sekam cerfpet" },
        
        
    ];

    var jubmledSentencesElement = document.getElementById("jumbled-sentence");
    var index = 0;
    var inputField = document.getElementById("answer");
    var messageElement = document.getElementById("message");
    var timeLeft = 101;
    var timer;
    var timerElement = document.getElementById("current-time");
    var score=0;
    var scoreElement = document.getElementById('score');

    // shuffling an array
    function shuffleArray(array) {
        let shuffled = array.slice(); // Create a copy of the array
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Original array
    let originalArray = [0, 1, 2, 3, 4, 5, 6];

    // Shuffle the array and store it in a new variable
    let shuffledArray = shuffleArray(originalArray);



    function startGame(){

        currentIndex = shuffledArray[index];
        timeLeft = 101;
        displayNextJumble();
        startTimer();
        // alert(shuffledArray+ "_" + currentIndex);
    }
    

    function displayNextJumble(){
        if (index < sentences.length){
            jubmledSentencesElement.textContent = sentences[currentIndex].jumbled;
            inputField.value= "";
            inputField.focus();
            // document.getElementById("submit").focus();
            // messageElement.textContent = "testing";
        }
        else {
            clearInterval(timer);
            messageElement.textContent = "Congratulations! You solved all the jumbled sentences!";
            alert("Congratulations! You solved all the jumbled sentences!");
            window.location.href = "final.html";
        }
    }

    function checkAnswer() {
        var userAnswer = inputField.value.trim();
        if (userAnswer === sentences[currentIndex].original) {
            index++;
            currentIndex=shuffledArray[index];
            messageElement.textContent = "Correct! Answer.";
            score++;
            scoreElement.textContent=score + "/7";
            popup();
            displayNextJumble();
        } else {
            messageElement.textContent = "Incorrect Answer! Try Again.";
            popup();
            // startGame();
        }
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(function() {
            timeLeft--;
            timerElement.textContent = timeLeft ;
            if (timeLeft <= 0) {
                clearInterval(timer);
                messageElement.textContent = "Time's up! Starting over.";
                popup();
                alert("Time's up! Click ok to restart.");
                score=0;
                scoreElement.textContent=score + "/7";
                // alert("Times up");
                startGame();
            }
        }, 1500);
    }

    function popup(){
        setTimeout(function() {
        messageElement.textContent="";
    }, 3000);
        // messageElement.style.display= 'block';
    }

    function moveFocusToButton(event) {
    if (event.key === 'Enter') {
        document.getElementById('submit').focus();
    }
}

window.onload = function() {
    inputField.addEventListener('keydown', moveFocusToButton);
}

document.getElementById("submit").addEventListener("click", checkAnswer);

    startGame();
});