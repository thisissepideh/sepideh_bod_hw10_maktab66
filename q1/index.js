let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;

  if (currentPlayer == "X") clickedCell.classList.add("fill-x");
  else clickedCell.classList.add("fill-o");
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    if (currentPlayer == "X")
      document.querySelector(".board").classList.add("win-x");
    else document.querySelector(".board").classList.add("win-o");

    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    document.querySelector(".board").classList.add("draw");

    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  console.log(clickedCell);
  console.log(clickedCellIndex);

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  if (gameActive) return;
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".tile").forEach((cell) => (cell.innerHTML = ""));
  document
    .querySelectorAll(".tile")
    .forEach((cell) => cell.classList.remove("fill-x"));
  document
    .querySelectorAll(".tile")
    .forEach((cell) => cell.classList.remove("fill-o"));
  document.querySelector(".board").classList.remove("win-x");
  document.querySelector(".board").classList.remove("win-o");
  document.querySelector(".board").classList.remove("draw");
}

document
  .querySelectorAll(".tile")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

document.body.addEventListener("click", handleRestartGame, true);
