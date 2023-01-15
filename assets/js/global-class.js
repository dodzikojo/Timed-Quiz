export class quizResult {
    constructor(userInitial, userScore) {
      this.id = 'score: '+userInitial + '_' + this.dateTime
      this.userInitial = userInitial
      this.userScore = userScore
      this.dateTime = new Date().toDateString() + " " + new Date().toLocaleTimeString()
    }
  }
  