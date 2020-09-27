//Timer
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

timeKeeper();
