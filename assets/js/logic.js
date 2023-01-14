import { allQuestions_Answers } from '../js/questions.js'

class questionAnswers {
  constructor (questionID, questionOrder, question, multipleChoices_Answer) {
    ;(questionID, questionID),
      (questionOrder = questionOrder),
      (question = question),
      (multipleChoices_Answer = multipleChoices_Answer)
  }
}

let quizTimer = 100
let randomizedQuestionsArray
let questionsCounter = 0
// let answeredQuestionsID = []

let getTimerEl = document.getElementById('time')
let answerBtnEl
let startQuizBtnEl = document.getElementById('start')
let questionTextEl = document.getElementById('question-title')
let choicesListEl = document.getElementById('choices')
let resultValueTextEl = document.getElementById('result-value')
let finalScoreTextEl = document.getElementById('final-score')

let startScreenDivEl = document.getElementById('start-screen')
let questionScreenDivEl = document.getElementById('questions')
let displayResultDivEl = document.getElementById('display-result')

var submitBtnEl = document.querySelector('#submit')

let endScreenDivEl = document.getElementById('end-screen')

startQuizBtnEl.addEventListener('click', countdown)

getTimerEl.textContent = quizTimer;

choicesListEl.addEventListener('click', function (event) {
  while (choicesListEl.firstChild) {
    choicesListEl.removeChild(choicesListEl.lastChild)
  }
  setSingleQuestion_Answers(randomizedQuestionsArray, questionsCounter++)
})

submitBtnEl.addEventListener('click', showResponse)

function showResponse (event) {
  // Prevent default action
  event.preventDefault()
  let initialsTextEl = document.getElementById('initials')

  const result = {
    initials: initialsTextEl.value,
    score: quizTimer,
    scoreId:
      initialsTextEl.value.trim() + '_' + new Date().toLocaleDateString(),
    dateTime: new Date().toLocaleString()
  }

  localStorage.setItem('score: ' + result.scoreId, JSON.stringify(result))

  localStorage.setItem('scoreId:' + result.scoreId, result.score)

  location.href = '../pages/highscores.html'
}

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

  return randomArrMap.sort(function (a, b) {
    return 0.5 - Math.random()
  })
}

function setSingleQuestion_Answers (randomizedQuestionsArray, questionsCounter) {
  if (questionsCounter >= allQuestions_Answers.length) {
  } else {
    let newQuestionAnswer = new questionAnswers()
    newQuestionAnswer.questionOrder = questionsCounter
    newQuestionAnswer.question = randomizedQuestionsArray[questionsCounter][0] //Gets the Question
    newQuestionAnswer.multipleChoices_Answer =
      randomizedQuestionsArray[questionsCounter][1] //Gets the Answers

    let randomizedAnswers = randomizeArrayMap(
      newQuestionAnswer.multipleChoices_Answer
    )
    choicesListEl = document.getElementById('choices')

    questionTextEl.textContent = newQuestionAnswer.question

    let answerCounter = 1
    let correntAnswerIndex = 0
    let answerIndex = 0
    for (var [key, value] of randomizedAnswers.entries()) {
      answerBtnEl = document.createElement('button')
      answerBtnEl.setAttribute('type', 'button')
      answerBtnEl.setAttribute(
        'question-order',
        newQuestionAnswer.questionOrder
      )

      //Get Correct Answer Index
      if (value[1] === true) {
        correntAnswerIndex = answerIndex
      }

      answerBtnEl.setAttribute('response-index', answerIndex)
      answerIndex++

      answerBtnEl.addEventListener('click', function (event) {
        let userAnswerIndex = this.getAttribute('response-index')
        displayResultDivEl.setAttribute('class', '')

        //Check if user has submitted the correct answer
        if (userAnswerIndex == correntAnswerIndex) {
          resultValueTextEl.textContent = 'Correct!'
          playAudio('../../assets/sfx/correct.wav')
        } else {
          playAudio('../../assets/sfx/incorrect.wav')
          resultValueTextEl.textContent = 'Wrong! (-10 seconds)'
          quizTimer = quizTimer - 10 
        }
      })

      setTimeout(function () {
        displayResultDivEl.setAttribute('class', 'hide')
      }, 2000)

      answerBtnEl.textContent = answerCounter++ + '. ' + value[0]
      choicesListEl.appendChild(answerBtnEl)
    }
  }
}


//#region TestingCode
// getSetAllQuestions_Answers()

// function getSetAllQuestions_Answers () {
//   let randomizedQuestionsArray = randomizeArray(allQuestions_Answers)

//   for (let index = 0; index < randomizedQuestionsArray.length; index++) {
//     let question = randomizedQuestionsArray[index][0]
//     let answers = randomizedQuestionsArray[index][1]

//     let randomizedAnswers = randomizeArrayMap(answers)
//     choicesListEl = document.getElementById('choices')

//     console.log('--------QUESTION--------')
//     console.log(question)
//     console.log('-------RANDOMISED ANSWERS---------')

//     for (var [key, value] of randomizedAnswers.entries()) {
//       console.log(value[0] + ' = ' + value[1])
//     }

//     choicesListEl = null
//     console.log('================')
//   }
// }
//#endregion

function playAudio (url) {
  new Audio(url).play()
}




function countdown () {
  let timerDivEl = document.getElementById('timer')
  randomizedQuestionsArray = randomizeArray(allQuestions_Answers)


  startScreenDivEl.setAttribute('class', 'hide')
  questionScreenDivEl.setAttribute('class', '')

  setSingleQuestion_Answers(
    randomizedQuestionsArray,
    questionsCounter++,
    quizTimer
  )

  var timeInterval = setInterval(function () {
    // YOUR CODE HERE
    getTimerEl.textContent = quizTimer--
    if (quizTimer < 30) {
      timerDivEl.style.color = 'red'
      timerDivEl.style.fontWeight = 'bold'
    }
    if (quizTimer == 0) {
      getTimerEl.textContent = '0'
      clearInterval(timeInterval)
      questionScreenDivEl.setAttribute('class', 'hide')
      endScreenDivEl.setAttribute('class', '')

      finalScoreTextEl.textContent = quizTimer
    }

    if (questionsCounter > allQuestions_Answers.length) {
      clearInterval(timeInterval)
      questionScreenDivEl.setAttribute('class', 'hide')
      timerDivEl.setAttribute('class', 'hide')
      displayResultDivEl.setAttribute('class', 'hide')
      endScreenDivEl.setAttribute('class', '')

      finalScoreTextEl.textContent = quizTimer

    }

    //
  }, 1000)
}
