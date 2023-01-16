import { allQuestions_Answers } from '../js/questions.js'
import { quizResult } from '../js/global-class.js'


class questionAnswers {
  constructor(
    questionNumber,
    questionTitle,
    multipleChoices_Answer,
    isUserAnswerCorrect,
    userAnswer,
    correctAnswer,
    explanation
  ) {
    this.questionNumber = questionNumber
    this.questionTitle = questionTitle
    this.multipleChoices_Answer = multipleChoices_Answer
    this.isUserAnswerCorrect = isUserAnswerCorrect
    this.userAnswer = userAnswer
    this.correctAnswer = correctAnswer
    this.explanation = explanation
  }
}

//#region testing nMap
// const n = "90AB"
// const nMap = {
//   "90AB": ["userInitial", "userScore", new Date().toDateString() + " " + new Date().toLocaleTimeString()],
//   "90AB": 'res-2',
//   "90AB": 'res-3'
// }


// const result = nMap[ n ]
// console.log(result)
//#endregion

let quizTimer = 75
let randomizedQuestionsArray
let questionsCounter = 0
let answeredQuestions = []
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
let expanderDivEl = document.getElementById('result-expander')
let clockTickAudioEl = document.getElementById('clock-ticker')
var submitBtnEl = document.querySelector('#submit')
let endScreenDivEl = document.getElementById('end-screen')

startQuizBtnEl.addEventListener('click', countdown)

getTimerEl.textContent = quizTimer

choicesListEl.addEventListener('click', function (event) {
  while (choicesListEl.firstChild) {
    choicesListEl.removeChild(choicesListEl.lastChild)
  }
  setSingleQuestion_Answers(randomizedQuestionsArray, questionsCounter++)
})

submitBtnEl.addEventListener('click', showResponse)

function showResponse(event) {
  // Prevent default action
  event.preventDefault()
  let initialsTextEl = document.getElementById('initials')

  let newQuizResult = new quizResult(initialsTextEl.value.trim(), quizTimer)

  console.log(newQuizResult)

  localStorage.setItem(newQuizResult.id, JSON.stringify(newQuizResult))

  location.href = '././pages/highscores.html'
}

function randomizeArray(arr) {
  var randomArr = []

  for (let index = 0; index < arr.length; index++) {
    randomArr.push(arr[index])
  }

  return randomArr.sort(function (a, b) {
    return 0.5 - Math.random()
  })
}

function randomizeArrayMap(map) {
  var randomArrMap = []

  for (var [key, value] of map.entries()) {
    var sample = [key, value]
    randomArrMap.push(sample)
  }

  return randomArrMap.sort(function (a, b) {
    return 0.5 - Math.random()
  })
}

function createQuestion_AnswerCards(
  questionNumber,
  questionTitle,
  userAnswer,
  isUserAnswerCorrect,
  correctAnswer,
  explanation
) {
  let mainCard = document.createElement('div')
  mainCard.setAttribute('class', 'card text-dark bg-light mt-3 mb-3')

  let cardHeader = document.createElement('div')
  cardHeader.setAttribute('class', 'card-header')

  let cardTitleEl_QuestionAnswer = document.createElement('h5')
  cardTitleEl_QuestionAnswer.setAttribute(
    'class',
    'card-title left-align mt-1 mb-1 fw-bold'
  )
  cardTitleEl_QuestionAnswer.setAttribute('style', 'font-size: 16px;')
  cardTitleEl_QuestionAnswer.textContent = questionNumber + '. ' + questionTitle

  let cardTitleSpanEl_CurrentAnswer = document.createElement('span')
  cardTitleSpanEl_CurrentAnswer.setAttribute('style', 'font-weight: bold')

  let cardBody = document.createElement('div')
  cardBody.setAttribute('class', 'card-body')

  let imageEl = document.createElement('img')
  imageEl.setAttribute('class', 'd-inline me-2')
  imageEl.setAttribute('style', 'height: 40px')

  let answer_ExplanationLabelEl = document.createElement('h5')
  answer_ExplanationLabelEl.setAttribute('class', 'card-text')
  answer_ExplanationLabelEl.style.fontSize = '14px'

  let correctAnswer_El = document.createElement('h4')

  correctAnswer_El.style.fontSize = '17px'
  correctAnswer_El.textContent = correctAnswer

  let cardTextEl_UserAnswer = document.createElement('h5')
  cardTextEl_UserAnswer.style.fontSize = '16px'
  cardTextEl_UserAnswer.textContent = userAnswer

  if (isUserAnswerCorrect == true) {
    imageEl.setAttribute('src', '././assets/images/correct.png')
    answer_ExplanationLabelEl.textContent = 'Explanation'
    correctAnswer_El.setAttribute(
      'class',
      'card-text left-align fw-bold d-none'
    )
    cardTextEl_UserAnswer.setAttribute(
      'class',
      'card-title left-align d-inline fw-bold'
    )
  } else {
    imageEl.setAttribute('src', '././assets/images/incorrect.png')
    answer_ExplanationLabelEl.textContent = 'Correct Answer and Explanation'
    correctAnswer_El.setAttribute('class', 'card-text left-align fw-bold ')
    cardTextEl_UserAnswer.setAttribute(
      'class',
      'card-title left-align d-inline'
    )
  }

  let hrEl_line = document.createElement('hr')
  hrEl_line.setAttribute('class', 'my-2')

  let cardText_Explanation = document.createElement('p')
  cardText_Explanation.setAttribute('class', 'card-text left-align')
  cardText_Explanation.style.fontSize = '15px'
  cardText_Explanation.style.fontStyle = 'italic'
  cardText_Explanation.textContent = explanation

  cardBody.appendChild(imageEl)
  cardBody.appendChild(cardTextEl_UserAnswer)
  cardBody.appendChild(hrEl_line)
  cardBody.appendChild(answer_ExplanationLabelEl)
  cardBody.appendChild(correctAnswer_El)

  cardBody.appendChild(cardText_Explanation)

  cardHeader.appendChild(cardTitleEl_QuestionAnswer)
  mainCard.appendChild(cardHeader)
  mainCard.appendChild(cardBody)

  expanderDivEl.appendChild(mainCard)
}

function setSingleQuestion_Answers(randomizedQuestionsArray, questionsCounter) {
  if (questionsCounter >= allQuestions_Answers.length) {
  } else {
    let newQuestionAnswer = new questionAnswers()
    newQuestionAnswer.questionNumber = questionsCounter
    newQuestionAnswer.questionTitle =
      randomizedQuestionsArray[questionsCounter][0] //Gets the Question

    newQuestionAnswer.multipleChoices_Answer =
      randomizedQuestionsArray[questionsCounter][1] //Gets the Answers
    newQuestionAnswer.explanation =
      randomizedQuestionsArray[questionsCounter][2]

    let randomizedAnswers = randomizeArrayMap(
      newQuestionAnswer.multipleChoices_Answer
    )
    choicesListEl = document.getElementById('choices')

    questionTextEl.textContent = newQuestionAnswer.questionTitle

    let answerCounter = 1
    let correntAnswerIndex = 0
    let answerIndex = 0
    for (var [key, value] of randomizedAnswers.entries()) {
      answerBtnEl = document.createElement('button')
      answerBtnEl.setAttribute('type', 'button')
      answerBtnEl.setAttribute(
        'question-order',
        questionsCounter
      )

      //Get Correct Answer Index
      if (value[1] === true) {
        correntAnswerIndex = answerIndex
        newQuestionAnswer.correctAnswer = value[0]
      }

      answerBtnEl.setAttribute('response-index', answerIndex)
      answerIndex++

      answerBtnEl.addEventListener('click', function (event) {
        let userAnswerIndex = this.getAttribute('response-index')
        displayResultDivEl.setAttribute('class', '')

        //Check if user has submitted the correct answer
        if (userAnswerIndex == correntAnswerIndex) {
          newQuestionAnswer.isUserAnswerCorrect = true
          resultValueTextEl.textContent = 'Correct!'
          playAudio('././assets/sfx/correct.wav')
        } else {
          newQuestionAnswer.isUserAnswerCorrect = false
          playAudio('././assets/sfx/incorrect.wav')
          resultValueTextEl.textContent = 'Wrong! (-10 seconds)'
          if (quizTimer > 10) {
            quizTimer = quizTimer - 10
          }
          else {
            quizTimer = 0
          }
        }

        let indexCounter = 0
        for (var [key, value] of randomizedAnswers.entries()) {
          //Get user's selected answer text.
          if (indexCounter == userAnswerIndex) {
            newQuestionAnswer.userAnswer = value[0]
            break
          }
          indexCounter++
        }
        answeredQuestions.push(newQuestionAnswer)
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

function playAudio(url) {
  new Audio(url).play()
}

function pauseAudio(url) {
  new Audio(url).pause()
}

function countdown() {
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
   
    getTimerEl.textContent = quizTimer--

    if (quizTimer < 10) {
      clockTickAudioEl.play()
    }

    if (quizTimer < 30) {
      timerDivEl.style.color = 'red'
      timerDivEl.style.fontWeight = 'bold'
    }

    if (quizTimer < 0) {
      quizTimer = 0
    }

    if (questionsCounter > allQuestions_Answers.length || quizTimer <= 0) {
      clearInterval(timeInterval)
      clockTickAudioEl.pause()
      getTimerEl.textContent = quizTimer
      finalScoreTextEl.textContent = quizTimer
      questionScreenDivEl.setAttribute('class', 'hide')
      timerDivEl.setAttribute('class', 'hide')
      displayResultDivEl.setAttribute('class', 'hide')

      //if no question is answered, hide the result-expander div.
      if (answeredQuestions.length == 0) {
        expanderDivEl.setAttribute('class', 'hide')
      }

      answeredQuestions.forEach(questionAnswer => {
        createQuestion_AnswerCards(
          ++questionAnswer.questionNumber,
          questionAnswer.questionTitle,
          questionAnswer.userAnswer,
          questionAnswer.isUserAnswerCorrect,
          questionAnswer.correctAnswer,
          questionAnswer.explanation
        )
      })

      endScreenDivEl.setAttribute('class', '')
    }

  }, 1000)
}




