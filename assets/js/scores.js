import { quizResult } from '../js/global-class.js'

let clearBtnEl = document.getElementById('clear')
let scoreTableEl = document.getElementById('score-table')
const items = { localStorage }


// iterate localStorage
for (var i = 0; i < localStorage.length; i++) {
  // set iteration key name
  var key = localStorage.key(i)

  // use key name to retrieve the corresponding value
  if (key.toLocaleLowerCase().includes('score:')) {
    var value = localStorage.getItem(key)

    let intialColumnEl = document.createElement('td')
    let scoreColumnEl = document.createElement('td')
    let dateColumnEl = document.createElement('td')

    var result = JSON.parse(value)

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