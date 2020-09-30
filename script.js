var timeLeft = 100;
//time stop ends our timer.
var timeStop = false;
var timer = document.querySelector(".timer");

function timeKeeper() {
	var timeInterval = setInterval(function () {
		//once questions run out, the timeStop flag is thrown to end the timer
		if (timeLeft <= 0) {
			clearInterval(timeInterval);
			endGame();
		} else if (timeStop == true) {
			clearInterval(timeInterval);
		}
		timeLeft--;
		timer.innerHTML = "TIMER: " + timeLeft;
	}, 1000);
}

var questionBank = [
	{
		questionText: "By default, this tag produces the largest text size in HTML",
		answerBank: [
			{ correct: false, answer: "p" },
			{ correct: true, answer: "h1" },
			{ correct: false, answer: "a" },
			{ correct: false, answer: "h6" },

		],
	},

	{
		questionText: "In HTML, which tag will make an unordered list?",
		answerBank: [
			{ correct: false, answer: "li" },
			{ correct: false, answer: "list" },
			{ correct: false, answer: "ol" },
			{ correct: true, answer: "ul" },
		],
	},
	{
		questionText:
			"Which HTML tag can be used to link Javascript into a web page?",
		answerBank: [
			{ correct: false, answer: "javascript" },
			{ correct: false, answer: "style" },
			{ correct: true, answer: "script" },
			{ correct: false, answer: "a href" },
		],
	},
	{
		questionText: "Which of the following is not a programming language?",
		answerBank: [
			{ correct: true, answer: "COLEBOL" },
			{ correct: false, answer: "malbolge" },
			{ correct: false, answer: "leet" },
			{ correct: false, answer: "INTERCAL" },
		],
	},
	{
		questionText: "Which of the following is widely-regarded to be the first programming language?",
		answerBank: [
			{ correct: false, answer: "C" },
			{ correct: true, answer: "FORTRAN" },
			{ correct: false, answer: "COBOL" },
			{ correct: false, answer: "Basic" },
		],
	},
	{
		questionText: "Which of the following is not a data-type supported by Javascript?",
		answerBank: [
			{ correct: true, answer: "Tuple" },
			{ correct: false, answer: "String" },
			{ correct: false, answer: "Bigint" },
			{ correct: false, answer: "Null" },
		],
	},
	{
		questionText: "When was CSS created?",
		answerBank: [
			{ correct: true, answer: "1996" },
			{ correct: false, answer: "2005" },
			{ correct: false, answer: "2010" },
			{ correct: false, answer: "1980" },
		],
	},
	{
		questionText: "HTML was created in what year?",
		answerBank: [
			{ correct: false, answer: "1989" },
			{ correct: false, answer: "2001" },
			{ correct: false, answer: "1975" },
			{ correct: true, answer: "1993" },
		],
	},

];

function returnRandomQuestion() {
	var qIndex = [Math.floor(Math.random() * questionBank.length)];

	//splice out the randomly selected question
	var removedSplice = questionBank.splice(qIndex, 1);

	//lookup the object within the array, so it returns the object and not the array.
	return removedSplice[0];
}

//variables that hold the question display
var mainDisplay = document.querySelector(".main-display");
var subDisplay = document.querySelector(".sub-display");
var alertDisplay = document.querySelector(".alert");
var answerButtonsDiv = document.querySelector(".answer-buttons-div");

function createAnswerButton(a) {
	let button = document.createElement("button", { type: "button" });

	//set the text of the button, create an attribute we will check for the correct answer
	button.textContent = a.answer;
	button.setAttribute("correct", a.correct);

	//bootstrap attrs
	button.setAttribute("type", "button");
	button.className = "btn btn-primary btn-lg w-25 mt-2";

	answerButtonsDiv.append(button);
}

//Function to CLEAR our display contents
function clearDisplay() {
	mainDisplay.innerHTML = "";
	subDisplay.innerHTML = "";
	answerButtonsDiv.innerHTML = "";
	alertDisplay.innerHTML = "";

}

//use a universal script to check if we clicked the right answer, otherwise deduct time.
answerButtonsDiv.addEventListener("click", function (event) {
	event.preventDefault();

	if (event.target.matches("button")) {
		var choice = event.target.getAttribute("correct");

		//We need to use else if to catch the bug where the initial button messes up our time.
		if (choice == "true") {
			questionDisplay();
			alertDisplay.innerHTML = "YOU GOT IT RIGHT!";
		} else if (choice == "false") {
			questionDisplay();
			timeLeft -= 10;
			alertDisplay.innerHTML = "WRONG ANSWER.  10 SECONDS DEDUCTED.";
		}
	}
});

function questionDisplay() {
	clearDisplay();

	var currentQuestion = returnRandomQuestion();

	//if we run out of questions, end the game.
	if (!currentQuestion) {
		endGame();
		return;
	}

	mainDisplay.textContent = currentQuestion["questionText"];

	//generate button array
	//pass currentQuestion object entries into createAnswerButton()
	for (var i = 0; i < 4; i++) {
		createAnswerButton(currentQuestion.answerBank[i]);
	}
}

//array for holding highscores
var highScoreList = [];

function endGame() {
	clearDisplay();

	//end our timekeeping.  Record score.
	timeStop = true;
	var score = timeLeft;

	mainDisplay.innerHTML = "You're done!";
	subDisplay.innerHTML = "Your final score is " + score;

	//create score submission dialog
	var submitForm = document.createElement("input");
	submitForm.setAttribute("placeholder", "Enter your name here!");
	submitForm.setAttribute("type", "text");
	submitForm.className = "w-25 m-5";

	var submitButton = document.createElement("button");
	submitButton.textContent = "SUBMIT!"
	submitButton.setAttribute("type", "button");
	submitButton.className = "btn btn-primary btn-lg w-25 mx-auto mt-2";

	subDisplay.append(submitForm);
	subDisplay.append(submitButton);

	//logic for submitButton.  
	//Loads highscores from storage, takes current score and name, packs them back into local storage.
	submitButton.addEventListener("click", function (event) {
		event.preventDefault();

		HSraw = localStorage.getItem("highScoreList")

		//if there are High scores in the storage, load them to the list.
		if (HSraw) {
			highScoreList = JSON.parse(HSraw);
		};

		var name = submitForm.value;
		var highScore = [];
		highScore.push(name, timeLeft)
		highScoreList.push(highScore);


		localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
		window.open("highScores.html", "_self");
	});

}

//Event listener for the intro button to start displaying questions.
document.querySelector(".intro-button").addEventListener("click", function () {
	timeKeeper();
	questionDisplay();
});