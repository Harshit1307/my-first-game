let currentPlayer = "X"
let cells = Array(9).fill(null)
const scores = { X: 0, O: 0 }
let gameActive = true

const board = document.querySelector(".board")
const playerTurnDisplay = document.querySelector(".player-turn")
const messageDisplay = document.querySelector(".message")
const xScoreDisplay = document.querySelector(".x-score span")
const oScoreDisplay = document.querySelector(".o-score span")

// Initialize the game board
function initializeBoard() {
  board.innerHTML = ""
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.setAttribute("data-index", i)
    cell.addEventListener("click", handleCellClick)
    board.appendChild(cell)
  }
  updatePlayerTurn()
}

// Handle cell clicks
function handleCellClick(e) {
  if (!gameActive) return

  const cell = e.target
  const index = cell.getAttribute("data-index")

  if (cells[index]) return

  cells[index] = currentPlayer
  cell.textContent = currentPlayer
  cell.style.color = currentPlayer === "X" ? "#ef4444" : "#3b82f6"

  const winner = checkWinner()
  if (winner) {
    endGame(winner)
  } else if (cells.every((cell) => cell !== null)) {
    endGame("draw")
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    updatePlayerTurn()
  }
}

// Check for winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ]

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      highlightWinnerCells(pattern)
      return cells[a]
    }
  }
  return null
}

// Highlight winning cells
function highlightWinnerCells(pattern) {
  pattern.forEach((index) => {
    const cell = board.children[index]
    cell.classList.add("winner")
  })
}

// Play win tune
function playWinTune() {
  const audio = new Audio("./assests/win-tune.mp3")
  audio.play()
}

// End game
function endGame(result) {
  gameActive = false
  if (result === "draw") {
    messageDisplay.textContent = "It's a draw!"
  } else {
    messageDisplay.textContent = `Player ${result} wins!`
    scores[result]++
    updateScores()
    playWinTune() // Play tune when a player wins
  }
}

// Update scores
function updateScores() {
  xScoreDisplay.textContent = scores.X
  oScoreDisplay.textContent = scores.O
}

// Update player turn display
function updatePlayerTurn() {
  playerTurnDisplay.textContent = `Player ${currentPlayer}'s turn`
}

// Start new game
function startGame() {
  cells = Array(9).fill(null)
  currentPlayer = "X"
  gameActive = true
  messageDisplay.textContent = ""
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = ""
    cell.classList.remove("winner")
  })
  updatePlayerTurn()
}

// Reset scores
function resetScore() {
  scores.X = 0
  scores.O = 0
  updateScores()
  startGame()
}

// Toggle theme
function toggleTheme() {
  const root = document.documentElement
  const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark"
  root.setAttribute("data-theme", newTheme)
  document.body.classList.toggle("theme-transition")
  setTimeout(() => {
    document.body.classList.remove("theme-transition")
  }, 500)
}

// Initialize the game
initializeBoard()
document.body.classList.add("theme-transition")

