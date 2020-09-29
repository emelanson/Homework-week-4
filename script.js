//Event listener for the intro button to start displaying questions.
document.querySelector(".intro-button").addEventListener("click", function () {
	timeKeeper();
	questionDisplay();
});

//////////////////
/////////////TIMER
//////////////////

//Timer vars
var timer = document.querySelector(".timer");

//Here is function for timekeeping.  It will eventually subtract from timeLeft when wrong answers happen.
var timeLeft = 100;

function timeKeeper() {
	var timeInterval = setInterval(function () {
		timeLeft--;
		timer.innerHTML = "TIMER: " + timeLeft;

		if (timeLeft <= 0) {
			clearInterval(timeInterval);
			endGame();
			//Function here to draw the end screen
		}
		// console.log("timer", timeLeft);
	}, 1000);
}

//from stack overflow.  Used to sort our questions and answers randomly.
function randomize(a, b) {
	return Math.random() - 0.5;
}

///////////////////////
////QUESTIONS///////////////
//////////////////////////

//sample QUESTION.  I want to serve the answer bank and questions randomly as well.
//Individual questions will be nested in a questionBank object.
//ANSWERS will contain 3 false answers and a correct one.  Letters/display order will be assigned randomly.

//DO IT AS AN ARRAY OF OBJECTS AND WHAT YOU WERE THINKING WORKS!
var questionBank = [
	{
		questionText:
			"THIS IS THE TEXT FOR A QUESTION.  IT WILL BE A LITTLE LONGER I THINK.",
		answerBank: [
			{ correct: false, answer: "HTML" },
			{ correct: false, answer: "CSS" },
			{ correct: false, answer: "JS" },
			{ correct: true, answer: "ReactJS" },
		],
	},

	{
		questionText:
			"QUESTION 2 QUESTION 2 QUESTION 2 QUESTION 2 QUESTION 2 QUESTION 2",
		answerBank: [
			{ correct: false, answer: "HTM23423L" },
			{ correct: false, answer: "C34234SS" },
			{ correct: false, answer: "J23423S" },
			{ correct: true, answer: "Re234234actJS" },
		],
	},
	{
		questionText: "QUESTION 55555555555555555555555555555555",
		answerBank: [
			{ correct: false, answer: "HTM23423L" },
			{ correct: false, answer: "C34234SS" },
			{ correct: false, answer: "J23423S" },
			{ correct: true, answer: "Re234234actJS" },
		],
	},
	{
		questionText: "QUESTION 4444444444444444444444444444444444444444",
		answerBank: [
			{ correct: false, answer: "HTM23423L" },
			{ correct: false, answer: "C34234SS" },
			{ correct: false, answer: "J23423S" },
			{ correct: true, answer: "Re234234actJS" },
		],
	},
	{
		questionText: "QUESTION 333333333333333333333333333333333333333333333",
		answerBank: [
			{ correct: false, answer: "HTM23423L" },
			{ correct: false, answer: "C34234SS" },
			{ correct: false, answer: "J23423S" },
			{ correct: true, answer: "Re234234actJS" },
		],
	},

	//SLOW DOWN AND WRITE THIS IN STEPS.  FIRST RETURN A SINGLE ITEM.  THEN WE WILL WORRY ABOUT SPLICING OUT THE QUESTIONS SO WE DON'T RETURN THE SAME ONE TWICE.
];

function returnRandomQuestion() {
	var qIndex = [Math.floor(Math.random() * questionBank.length)];

	// console.log("NO SPLICE:", questionBank[qIndex]);
	// console.log("ALL QUESTIONS:", questionBank);

	//splice out the randomly selected question
	var removedSplice = questionBank.splice(qIndex, 1);

	//lookup the object within the array, so it returns the object and not the array.
	return removedSplice[0];
}

//functions to draw a question
var mainDisplay = document.querySelector(".main-display");
var subDisplay = document.querySelector(".alert");
var answerButtonsDiv = document.querySelector(".answer-buttons-div");

function createAnswerButton(a) {
	let button = document.createElement("button", { type: "button" });

	//set the text of the button, create an attribute we will check for the correct answer
	button.textContent = a.answer;
	button.setAttribute("correct", a.correct);

	//for bootstrap
	button.setAttribute("type", "button");
	button.className = "btn btn-primary btn-lg w-25 mt-2";

	// console.log("answerbutton property:", button);

	answerButtonsDiv.append(button);
}

//Function to CLEAR our display

function clearDisplay() {
	mainDisplay.innerHTML = "";
	subDisplay.innerHTML = "";
	answerButtonsDiv.innerHTML = "";
}

//use a universal script to check if we clicked the right answer, otherwise deduct time.
answerButtonsDiv.addEventListener("click", function (event) {
	event.preventDefault();

	if (event.target.matches("button")) {
		var choice = event.target.getAttribute("correct");
		console.log("choice:", choice);

		//We need to use else if to catch the bug where the initial button messes up our time.
		if (choice == "true") {
			questionDisplay();
			subDisplay.innerHTML = "YOU GOT IT RIGHT!";
			console.log("YOU DID TRUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
		} else if (choice == "false") {
			questionDisplay();
			timeLeft -= 10;
			console.log(timeLeft);
			subDisplay.innerHTML = "WRONG ANSWER.  10 SECONDS DEDUCTED.";
			console.log("YOU DID FAAAAAAAAAAAAAAAAAAAAAAAALSE");
		}
	}
});

function questionDisplay() {
	//Clear the display
	clearDisplay();

	//pick a random question;
	var currentQuestion = returnRandomQuestion();

	gameOverCheck(currentQuestion);
	//randomize answer order
	// currentQuestion.sort(randomize());

	console.log("CURRENT QUESTION", currentQuestion);
	mainDisplay.textContent = currentQuestion["questionText"];

	//generate button array
	//pass object entries into createAnswerButton()

	//!!!!!!!!!!!!!!!! Rethink this !!!!!!!!!!!!!!!!!!//
	// Object.entries(sampQuestion.answerBank).forEach(createAnswerButton());

	//can I use my second technique to return the desired object?
	for (var i = 0; i < 4; i++) {
		createAnswerButton(currentQuestion.answerBank[i]);
	}
	//update if last question was right or wrong
}

//when currentQuestion can't be assigned a new question (the bank has run out), we end the game.
function gameOverCheck(currentquest) {
	if (!currentquest) {
		endGame();
	}
}

function endGame() {
	clearDisplay();

	//record time left as score
	var score = timeLeft;
	clearInterval(timeInterval);

	mainDisplay.innerHTML = "You're done!";
	subDisplay.innerHTML = "Your final score is " + score;

	// //create score submission
	// let scoreForm = document.createElement("form", { type: "button" });

	// answerButtonsDiv.innerHTML = form
}
