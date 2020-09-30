# Homework-week-4

## UNC FS-BC - 04 - Web APIs. Code Quiz


# Overview

The Code Quiz project consists of two pages, `index.html` which houses the game, and `highScores.html`, which houses a table of stored highscores.  `script.js` is linked to `index.html`, while the js for highscores lives within the HTML file.  The pages were built with bootstrap 4.  I wanted to make the project more interesting than the given requirements by randomizing the order of questions that are displayed in the game.

### index.html
`index.html`'s layout is made up of a navbar and a container.  The navbar houses a link to `highScores.html` and a timer display (`timekeeper()`).  The main container houses `.main-display`, an h1 used to display questions, `.sub-display`, and h5 used to display intro text, `.answer-buttons-div`, the div in which the answer buttons are rendered, and `.alert`, used to display information about whether an answer choice is correct or not.  The page is hardcoded with introductory text explaining the game as the initial state.  Upon clicking the button, the game begins.  Users are presented with a question at random from a bank of 8 questions.  Four answer choices are rendered as buttons.  Selecting the correct answer presents the next question, selecting the incorrect answer presents the next question and subtracts 10 seconds from the timer (their score).  Once the timer runs out, or the questions run out, the user may enter their name and score into a list of highscores.  They are then taken to highScore.html to view all of the scores.

## script.js functions
#### timekeeper()
`timekeeper()` handles the games score and time system.  It is invoked once the user hits the begin game button.  It ticks down the global variable `timeLeft`.  It's conditional statement looks for `timeLeft` to be equal to 0, or for a flag, `timeStop`, to end the game and clear the interval.  The function also prints `timeLeft` to the `timer` page element in the navbar.

#### questionBank[]
`questionBank` is an array that houses the questions for the game.  Each question is an object containing a `questionText` and `answerBank`.  `questionText` is paired with a string that is used to display the question.  `answerBank` contains an array with 4 entries for choices.  Each entry is an object with two properties, `correct`, and `answer`.  `correct` is used to check if the choice is correct, `answer` is used to display the text for the answer.

- `questionBank`
    - `question`
        - `questionText:`
        - `answerBank:`
            - `correct:` `answer:`
            - `correct:` `answer:`
            - `correct:` `answer:`
            - `correct:` `answer:`

### questionDisplay() and game logic
`questionDisplay()` represents the game's main logic.  First, it calls `clearDisplay()`, a utility function that empties the elements within the container.  It then picks a random question as our `currentQuestion` using `returnRandomQuestion()`.

#### returnRandomQuestion()
 `returnRandomQuestion()` uses a random number function to generate `qIndex`.  `qIndex` represents the index in questionsBank of our desired question.  `questionBank.splice(qIndex, 1)` is used to remove the selected question from the bank, which is then returned by the function.  This process means that `questionBank` shrinks as the game is played, which can be used as an end condition.

`currentQuestion` is set to the result of `returnRandomQuestion()`.  If `currentQuestion` is undefined (no question returned), we begin `endGame()`.  Otherwise, `currentQuestion`'s `questionText` is rendered to `mainDisplay`, and `currentQuestion.answerBank` is used to generate the answer button array.

#### createAnswerButton(a)
`createAnswerButton()` is invoked for each entry (a) in `answerBank`.  The function creates a new button through DOM.  It assigns it's `textContent` to `a.answer`, and creates an attribute for `a.correct`.  It then styles the button using bootstrap and appends it to `answerButtonsDiv`.

#### endGame()
`endGame()` is called when `timeLeft <= 0` or `!currentQuestion`, the states of time running out or the `questionBank` running out, respectively.  It begins by calling `clearDisplay()`, throwing the `timeStop` flag to `timekeeper()` to ensure we have stopped keeping time, and setting `var score` to `timeLeft`.  The displays are updated to show the user's final score.  A form for the user to input their name into the high score list and a submit button are created and appended to the final screen.  

On click, the event listener on the `submitButton` pulls the `highScoreList` from local storage, and checks if it has contents before parsing the JSON and assigning it to the `highScoreList` variable.  
```
    highScore.push(name, timeLeft)
	highScoreList.push(highScore);
```
This block of code creates an array `highScore` to store our current `name` and `timeLeft` (score).  It then inserts that array as an entry of the `highScoreList` array, which is the final stored array.  Finally, the user is linked to `highScores.html` to view their scores.

### highScores.html
`highScores.html` is laid out as a return link to the game (`index.html`), and a table displaying the high scores.  The table has three columns for number, name, and score.  There is a button that resets the high score list.

When the page loads, it takes `highScoreList` from local storage and parses it to the variable `highScoresList`.  There is a for loop that calls `createHighScoreTable()` on every entry of `highScoresList`. 

#### createHighScoreTable()
`createHighScoreTable()` creates a new table row element, th element, and 2 td elements.  The th element is assigned the index of the `highScoresList` entry.  `tdName` is the name, and `tdScore` is the `timeLeft` of the entry.  The th and td elements are appended as children to the `tableRow`, and then the row is appended as a child to `tableEntries`.

#### resetButton
`resetButton` creates `highScoreList` as an empty string and uses it to overwrite the current `highScoreList` in local storage.  It then reloads the page so `createHighScoreTable()` can run again to generate an empty table.


## Roadmap

* Design the page using bootstrap, using a "sample question".
* Layout opening page
    - Has a nav including a link to the highscore page, and a timer in the upper right.
    - Has an intro text
* Build and render sample question
    - Question text
    - 4 choices
* Right/wrong indicator pops up after clicking an answer

* Create function for timer
* Create function to display muiltple questions
* Create logic to end game

* Create local storage function for score and name
* build highscore table
