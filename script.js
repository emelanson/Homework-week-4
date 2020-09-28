//Event listener for the intro button to start displaying questions.
document
	.querySelector(".intro-button")
	.addEventListener("click", questionDisplay);

//////////////////
/////////////TIMER
//////////////////

//Timer vars
var timer = document.querySelector(".timer");
var timeLeft = 100;

//Here is function for timekeeping.  It will eventually subtract from timeLeft when wrong answers happen.

function timeKeeper() {
	var timeInterval = setInterval(function () {
		timeLeft--;
		timer.innerHTML = "TIMER: " + timeLeft;

		if (timeLeft === 0) {
			clearInterval(timeInterval);
			//Function here to draw the end screen
		}
		console.log("timer", timeLeft);
	}, 1000);
}

//from stack overflow.  Used to sort our questions and answers randomly.
function randomize(a, b) {
	return Math.random() - 0.5;
}

// timeKeeper();

/////////////
////QUESTIONS///////////////
//////////////

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

	//SLOW DOWN AND WRITE THIS IN STEPS.  FIRST RETURN A SINGLE ITEM.  THEN WE WILL WORRY ABOUT SPLICING OUT THE QUESTIONS SO WE DON'T RETURN THE SAME ONE TWICE.
];

function returnRandomQuestion() {
	var qIndex = [Math.floor(Math.random() * questionBank.length)];

	return questionBank[qIndex];
}

//functions to draw a question
var mainDisplay = document.querySelector(".main-display");
var subDisplay = document.querySelector(".sub-display");
var answerButtonsDiv = document.querySelector(".answer-buttons-div");

function createAnswerButton(a) {
	let button = document.createElement("button", { type: "button" });

	//set the text of the button, create an attribute we will check for the correct answer
	button.textContent = a.answer;
	button.setAttribute("correct", a.correct);

	//for bootstrap
	button.setAttribute("type", "button");
	button.className = "btn btn-primary btn-lg w-25 mt-2";

	console.log("answerbutton property:", button);

	answerButtonsDiv.append(button);
}

//Function to CLEAR our display

function clearDisplay() {
	mainDisplay.innerHTML = "";
	subDisplay.innerHTML = "";
	answerButtonsDiv.innerHTML = "";
}

function questionDisplay() {
	//Clear the display
	clearDisplay();
	//pick a random question;
	var currentQuestion = returnRandomQuestion();

	console.log("CURRENT QUESTION", currentQuestion);
	mainDisplay.textContent = currentQuestion["questionText"];

	//generate button array
	//pass object entries into createAnswerButton()

	//!!!!!!!!!!!!!!!! Rethink this !!!!!!!!!!!!!!!!!!//
	// Object.entries(sampQuestion.answerBank).forEach(createAnswerButton());

	//can I use my second technique to return the desired object?
	for (var i = 0; i < 4; i++) {
		console.log(
			"Does this look something up",
			Object.values(currentQuestion)[i]
		);
		createAnswerButton(currentQuestion.answerBank[i]);
	}
}
// console.log("RANDOM QUESTION", sampQuestions.returnRandomQuestion());

console.log("RANDOM QUESTION", returnRandomQuestion());
