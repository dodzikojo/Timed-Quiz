import { allQuestions_Answers } from '../js/questions.js'

class questionAnswers {
  constructor (question, multipleChoices_Answer) {
    ;(question = question), (multipleChoices_Answer = multipleChoices_Answer)
  }
}

let getTimerEl = document.getElementById('time')
let startQuizBtnEl = document.getElementById('start')
let questionTextEl = document.getElementById('question-title')
let choicesListEl = document.getElementById('choices')

let questionScreenDivEl = document.getElementById('questions')
let endScreenDivEl = document.getElementById('end-screen')

document.addEventListener('click', countdown)

let newQuestionAnswer = new questionAnswers()


function randomizeArray (arr) {
  var randomArr = []

  for (let index = 0; index < arr.length; index++) {
    randomArr.push(arr[index])
  }

  return randomArr.sort(function (a, b) {
    return 0.5 - Math.random()
  })
}

function randomizeArrayMap (map) {
  var randomArrMap = []

  for (var [key, value] of map.entries()) {

    var sample = [key, value]
    randomArrMap.push(sample)
  }

  return randomArrMap.sort(function (b, a) {
    return 0.5 - Math.random()
  })
}

let randomizedQuestionsArray = randomizeArray(allQuestions_Answers)

for (let index = 0; index < randomizedQuestionsArray.length; index++) {
  let question = randomizedQuestionsArray[index][0]
  let answers = randomizedQuestionsArray[index][1]

  console.log('--------QUESTION--------')
  console.log(question)
  console.log('-------RANDOMISED ANSWERS---------')
  let randomizedAnswers = randomizeArrayMap(answers)

  for (var [key, value] of randomizedAnswers.entries()) {
    console.log(value[0] + " = " + value[1]);
    
  }

  console.log('================')
}

function countdown () {
  var timeLeft = 5

  var timeInterval = setInterval(function () {
    // YOUR CODE HERE
    getTimerEl.textContent = timeLeft--
    if (timeLeft == -1) {
      getTimerEl.textContent = '0'
      clearInterval(timeInterval)
      // displayMessage();
    }

    //
  }, 1000)
}

