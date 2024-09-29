const rows = 6;
const cols = 7;
const board = [];
let currentPlayer = "red";
const statusDisplay = document.getElementById("status");
const resetBtn = document.getElementById("reset");

function createBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      board[row][col] = null;
      boardElement.appendChild(cell);
      cell.addEventListener("click", () => dropDisc(col));
    }
  }
}

function dropDisc(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );
      cell.classList.add(currentPlayer);

      if (checkWin(row, col)) {
        statusDisplay.textContent = `Player ${
          currentPlayer === "red" ? 1 : 2
        } wins!`;
        disableBoard();
      } else if (isBoardFull()) {
        statusDisplay.textContent = "It's a tie!";
      } else {
        currentPlayer = currentPlayer === "red" ? "yellow" : "red";
        statusDisplay.textContent = `Player ${
          currentPlayer === "red" ? 1 : 2
        }'s turn (${currentPlayer === "red" ? "Red" : "Yellow"})`;
      }
      break;
    }
  }
}

function checkWin(row, col) {
  return (
    checkDirection(row, col, 1, 0) ||
    checkDirection(row, col, 0, 1) || 
    checkDirection(row, col, 1, 1) || 
    checkDirection(row, col, 1, -1)
  ); // Diagonal \
}

function checkDirection(row, col, rowDir, colDir) {
  let count = 0;
  for (let i = -3; i <= 3; i++) {
    const newRow = row + i * rowDir;
    const newCol = col + i * colDir;
    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      board[newRow][newCol] === currentPlayer
    ) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }
  return false;
}

function isBoardFull() {
  return board.every((row) => row.every((cell) => cell !== null));
}

function disableBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", () => dropDisc(cell.dataset.col));
  });
}

resetBtn.addEventListener("click", () => {
  currentPlayer = "red";
  statusDisplay.textContent = "Player 1's turn (Red)";
  createBoard();
});

createBoard();
