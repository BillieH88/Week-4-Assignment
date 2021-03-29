                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               //arrray of the quiz questions, avaialble choices, and correct answers     
var questions = [{
    title: "Which of the following function of an array object adds one or more elements to the front of an array and returns the new length of the array?",
    choices: ["1.unshift( )", "2.sort( )", "3.splice( )", "4.toString( )"],
    answer: "1.unshift( )"
},
{
    title: "The condition in an if / else statement is inclosed within __________.",
    choices: ["1. quotes", "2. curley brackets", "3. parentheses", "4. square brackets"],
    answer: "3. parentheses"
},
{
    title: " A very useful tool used during development and debugging for printing content to the debugger is :",
    choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
    answer: "4. console.log"
},
{
    title: "String values must be enclosed with ______ when being assigned to variables.",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parantheses"],
    answer: "3. quotes"
},
{
    title: "Arrays in JavaScript can be used to store_________.",
    choices: ["1. Booleans","2. Other Arrays" , "3. numbers and strings", "4. All of the above"],
    answer: "4. All of the above"
}
]

var feedback=document.getElementById("feedback")
//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>You are done!</h2>
<h3>Your final score is ` + score +  `</h3>
<p>Enter your Initials: <input type="text" id="name" placeholder="Initials"> </p>
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Reset Quiz</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `  <h1>   
Coding Quiz Challenge
</h1>
<h3>
Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!  
</h3><button onclick="start();">Start Quiz</button>
`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 10 seconds from the timer if user chooses an incorrect answer
function incorrect() {
    var correctA='Answer is incorrect and 10 seconds deducted from timer';
    window.alert(correctA);
    timeLeft -= 10; 

next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
var correctA='Answer is Correct you get 20 points';
window.alert(correctA);
score += 20;
next();

}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
       
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}
//const start_btn = document.querySelector(".start_btn button");
//console.dir(start_btn);


//start quiz button clicked
//start_btn.onclick = () =>{


//}



start();