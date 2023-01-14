// let highScoresListEl = document.getElementById('highscores')
let clearBtnEl = document.getElementById('clear')
let scoreTableEl = document.getElementById('score-table')
const items = { localStorage }

counter = 0
// iterate localStorage
for (var i = 0; i < localStorage.length; i++) {
  // set iteration key name
  var key = localStorage.key(i)

  // use key name to retrieve the corresponding value
  if (key.toLocaleLowerCase().includes('score:')) {
    var value = localStorage.getItem(key)

    // let rowNumberColumnEl = document.createElement('td')
    let intialColumnEl = document.createElement('td')
    let scoreColumnEl = document.createElement('td')
    let dateColumnEl = document.createElement('td')

    var result = JSON.parse(value)

    // for (let index = 0; index < result.length; index++) {
    //   console.log(result[index])
    // }

    row = scoreTableEl.insertRow()

    // rowNumberColumnEl.textContent = ++counter
    intialColumnEl.textContent = result.initials
    scoreColumnEl.textContent = result.score
    dateColumnEl.textContent = result.dateTime

    // row.appendChild(rowNumberColumnEl)
    row.appendChild(intialColumnEl)
    row.appendChild(scoreColumnEl)
    row.appendChild(dateColumnEl)
  }
}

clearBtnEl.addEventListener('click', function (event) {
  localStorage.clear()

  location.href = '../pages/highscores.html'
})



// getLocalStorageItems()

// //get all localstorage items starting with "scoreId"
// function getLocalStorageItems () {
//   let all = []
//   // iterate localStorage
//   for (var i = 0; i < localStorage.length; i++) {
//     // set iteration key name
//     var key = localStorage.key(i)

//     // use key name to retrieve the corresponding value
//     if (key.toLocaleLowerCase().includes('scoreid:')) {
//       var value = localStorage.getItem(key)

//       console.log(value)
//       const sample = {
//         scoreId: key,
//         score: value,
//       }

//       all.push(sample);
//     }
//   }

//   console.log(all);
// }
