const startGameBtn = document.querySelector('.start-btn')

const playAgainBtn = document.querySelector('.play-again-btn')

const guessBtn = document.querySelector('.guess-btn')

const settingScreenDOM = document.querySelector('.setting-screen-wrapper')

const playingScreenDOM = document.querySelector('.playing-screen-wrapper')

const winningScreenDOM = document.querySelector('.winning-screen-wrapper')

const playerInput = document.querySelector('.player-input')

const startGameSpinner = document.querySelector('.start-game-spinner')

const guessResultSpinner = document.querySelector('.guess-result-spinner')

const guessResultDOM = document.querySelector('.guess-result-info')

const activePlayerNameDOM = document.querySelector('.active-player-name')

const player1Name = document.getElementById('player-1-name')

const player2Name = document.getElementById('player-2-name')

const player1ScoreWrapper = document.querySelector('.player-1-score-wrapper')

const player2ScoreWrapper = document.querySelector('.player-2-score-wrapper')

const player1ScoreDOM = document.querySelector('.score-1')

const player2ScoreDOM = document.querySelector('.score-2')

// global var
let maxNum,
  winningScore,
  secretNumber,
  activePlayer,
  playerName,
  score,
  guessResult,
  playerGuess,
  winnerExist

startGameBtn.addEventListener('click', async (e) => {
  init() // Initialize game variable

  toggleSettingScreen() // Hide setting

  await displaySpinner(startGameSpinner, 'Generating random number')

  togglePlayingScreen() // Display playing

  populateDOM()
})

playerInput.addEventListener('input', async (e) => {
  e.target.value !== ''
    ? (guessBtn.disabled = false)
    : (guessBtn.disabled = true)

  playerGuess = Number(e.target.value)
})

guessBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  guessResultDOM.innerHTML = ''

  await displaySpinner(guessResultSpinner, 'Checking your guess')

  checkPlayerGuess(playerGuess)

  updateDOM()

  changeActivePlayer()

  generateSecretNumber() //Generate new secret number
})

playAgainBtn.addEventListener('click', () => {
  toggleSettingScreen()
  toggleWinningScreen()
})

const init = () => {
  score = [0, 0]
  activePlayer = 1
  guessResult = false
  winnerExist = false

  maxNum = document.getElementById('max-num').value || 3
  winningScore = Number(document.getElementById('winning-score').value) || 30
  playerName = [
    player1Name.value !== '' ? player1Name.value : 'Player 1',
    player2Name.value !== '' ? player2Name.value : 'Player 2',
  ]

  generateSecretNumber() // secretNumber
}

const generateSecretNumber = () => {
  secretNumber = Math.floor(Math.random() * maxNum) + 1
}

const changeActivePlayer = () => {
  activePlayer = activePlayer === 1 ? 2 : 1
  activePlayerNameDOM.innerHTML = `${playerName[activePlayer - 1]}'s turn`

  player1ScoreWrapper.classList.toggle('active')
  player2ScoreWrapper.classList.toggle('active')
}

const displaySpinner = (domElement, text) => {
  domElement.classList.remove('d-none')

  domElement.innerHTML = `<div class="spinner-border" role="status"></div>
                            <div>${text}...</div>`

  return new Promise((resolve) => {
    setTimeout(() => {
      domElement.classList.add('d-none')
      resolve()
    }, 750)
  })
}

const populateDOM = () => {
  activePlayerNameDOM.innerHTML = `${playerName[activePlayer - 1]}'s turn`
  document.querySelector('.score-owner-1').innerHTML = playerName[0]
  document.querySelector('.score-owner-2').innerHTML = playerName[1]
  document.querySelector('.game-title').classList.remove('d-none')
  player1ScoreDOM.innerHTML = score[0]
  player2ScoreDOM.innerHTML = score[1]
}

const checkPlayerGuess = (playerGuess) => {
  if (playerGuess === secretNumber) {
    guessResult = true
    score[activePlayer - 1] += 10
  } else {
    guessResult = false
  }
}

const updateDOM = () => {
  displayResultInfoDOM()
  updateScoreDOM()
  resetInputField()
  checkWinner()
}

const displayResultInfoDOM = () => {
  if (guessResult) {
    guessResultDOM.innerHTML = `Congrats ${
      playerName[activePlayer - 1]
    }!!! Your guess was correct, its ${secretNumber}.`
    guessResultDOM.style.color = '#2dbe25'
  } else {
    guessResultDOM.innerHTML = `Sorry ${
      playerName[activePlayer - 1]
    } Your guess was wrong. The correct number is ${secretNumber}`
    guessResultDOM.style.color = '#Be2528'
  }
}

const updateScoreDOM = () => {
  player1ScoreDOM.innerHTML = score[0]
  player2ScoreDOM.innerHTML = score[1]
}

const resetInputField = () => {
  playerInput.value = ''
  guessBtn.disabled = true
}

const checkWinner = () => {
  if (score[activePlayer - 1] >= winningScore) {
    displayWinningScreen()
  }
}

const displayWinningScreen = () => {
  togglePlayingScreen()
  toggleWinningScreen()
  document.querySelector('.winner-info-text').innerHTML = `The Winner Is ${
    playerName[activePlayer - 1]
  }`
  document.querySelector('.game-title').classList.add('d-none')
  guessResultDOM.innerHTML = ''
}

const toggleSettingScreen = () => {
  settingScreenDOM.classList.toggle('d-none')
}

const togglePlayingScreen = () => {
  playingScreenDOM.classList.toggle('d-none')
}

const toggleWinningScreen = () => {
  winningScreenDOM.classList.toggle('d-none')
}
