# Javascript Timed Quix
Multiple-choice coding quiz that can keep track of high scores and quiz-takers' initials.

## Project Requirements
* A timer based quiz to ask a series of JavaScript based questions.
  * Questions contain buttons for each answer.
  * When answer is clicked, the next question appears
  * If the answer clicked was incorrect then subtract time from the clock
  * The quiz should end when all questions are answered or the timer reaches 0.
  * When the game ends, it should display their score and give the user the ability to save their initials and their score

## Functionality
*Each question and their respective multiple choice answers and explanation are stored in an array.

```javascript
export let allQuestions_Answers = [
  [
    'Which type of JavaScript language is:',
    new Map([
      ['Object-Oriented', false],
      ['Object-Based', true],
      ['Assembly-language', false],
      ['High-level', false]
    ]),
    "JavaScript is not a pure OOP's (object oriented programming) based languages such as PHP, java or many other languages, although it is an object-based language. It is not OOP's based language, because it doesn't have three basic properties of object-oriented programming languages, such as polymorphism, encapsulation, and inheritance."
  ],
  [
    'Which one of the following also known as Conditional Expression:',
    new Map([
      ['Alternative to if-else', false],
      ['Switch statement', false],
      ['If-then-else statement', false],
      ['Immediate if', true]
    ]),
    'A conditional expression can only evaluate two things, which either true or false, that are purely based on the evaluation of the condition'
  ]
```

* Each generated question is store as an object based on a define "questionAnswers" class. 
    ```javascript
    class questionAnswers {
    constructor (
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
    ```
* This "questionAnswers" class also stores how the use answers each given question in order to provide a summary at the end of the quiz. See image below:
  
    ![preview](/preview/explanation-page.png)

* After quiz is complete, a highscores table display the various scores along with initials and date and time the quiz was performed.
  
    ![preview](/preview/highscores.png)

## Preview
[Live Preview](https://dodzikojo.github.io/Timed-Quiz/ "Live Preview")
