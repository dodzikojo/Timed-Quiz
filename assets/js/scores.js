import { quizResult } from '../js/global-class.js'

let clearBtnEl = document.getElementById('clear')
let scoreTableEl = document.getElementById('score-table')

//get the scores object from local storage
var allScores = localStorage.getItem("scores");

//stringify it
var allScoresParsed = JSON.parse(allScores);


if (allScoresParsed !== null) {
  //sort the list so that the highest score appears first
  allScoresParsed.sort(function (a, b) { return a.userScore - b.userScore });
  allScoresParsed.reverse();


  // iterate localStorage
  for (var i = 0; i < allScoresParsed.length; i++) {
    let result = new quizResult(allScoresParsed[i].userInitial, allScoresParsed[i].userScore, allScoresParsed[i].dateTime)

    let intialColumnEl = document.createElement('td')
    let scoreColumnEl = document.createElement('td')
    let dateColumnEl = document.createElement('td')

    let row = scoreTableEl.insertRow()

    intialColumnEl.textContent = result.userInitial
    scoreColumnEl.textContent = result.userScore
    dateColumnEl.textContent = result.dateTime

    row.appendChild(intialColumnEl)
    row.appendChild(scoreColumnEl)
    row.appendChild(dateColumnEl)
  }

}

clearBtnEl.addEventListener('click', function (event) {
  localStorage.clear()
  location.href = '../pages/highscores.html'
})