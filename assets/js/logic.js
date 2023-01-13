import { allQuestions_Answers } from '../js/questions.js'

class questionAnswers {
  constructor (question, multipleChoices_Answer) {
    ;(question = question), (multipleChoices_Answer = multipleChoices_Answer)
  }
}

let getTimerEl = document.getElementById('time')
let startQuizBtnEl = document.getElementById('start')

let newQuestionAnswer = new questionAnswers()

for (let index = 0; index < allQuestions_Answers.length; index++) {
    let question = allQuestions_Answers[index][0];
    let answers = allQuestions_Answers[index][1];

    console.log(question);

    for (var [key, value] of answers.entries()) {
        console.log(key + " = " + value);
      }

      console.log("================")
}

function countdown () {
  var timeLeft = 100

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    //
    // YOUR CODE HERE
    getTimerEl.textContent = timeLeft--
    if (timeLeft === -1) {
      getTimerEl.textContent = '0'
      clearInterval(timeInterval)
      // displayMessage();
    }

    //
  }, 1000)
}

document.addEventListener('click', countdown)
