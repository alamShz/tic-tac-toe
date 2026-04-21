function Cell() {
  let value = null;
  const addMarker = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addMarker,
    getValue,
  };
}

const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const drawMarker = (row, column, player) => {
    if (board[row][column].getValue() !== null) {
      return false;
    }

    board[row][column].addMarker(player);
    return true;
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    console.log(boardWithCellValues);
  };

  const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = Cell();
      }
    }
  };

  return { getBoard, drawMarker, printBoard, resetBoard };
})();

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two",
) {
  const board = Gameboard;

  const players = [
    {
      name: playerOneName,
      marker: 1,
    },
    {
      name: playerTwoName,
      marker: 2,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const checkWinner = () => {
    if (
      (board.getBoard()[0][0].getValue() === getActivePlayer().marker &&
        board.getBoard()[0][1].getValue() === getActivePlayer().marker &&
        board.getBoard()[0][2].getValue() === getActivePlayer().marker) ||
      (board.getBoard()[1][0].getValue() === getActivePlayer().marker &&
        board.getBoard()[1][1].getValue() === getActivePlayer().marker &&
        board.getBoard()[1][2].getValue() === getActivePlayer().marker) ||
      (board.getBoard()[2][0].getValue() === getActivePlayer().marker &&
        board.getBoard()[2][1].getValue() === getActivePlayer().marker &&
        board.getBoard()[2][2].getValue() === getActivePlayer().marker) ||
      (board.getBoard()[0][0].getValue() === getActivePlayer().marker &&
        board.getBoard()[1][0].getValue() === getActivePlayer().marker &&
        board.getBoard()[2][0].getValue() === getActivePlayer().marker) ||
      (board.getBoard()[0][1].getValue() === getActivePlayer().marker &&
        board.getBoard()[1][1].getValue() === getActivePlayer().marker &&
        board.getBoard()[2][1].getValue() === getActivePlayer().marker) ||
      (board.getBoard()[0][2].getValue() === getActivePlayer().marker &&
        board.getBoard()[1][2].getValue() === getActivePlayer().marker &&
        board.getBoard()[2][2].getValue() === getActivePlayer().marker) ||
      (board.getBoard()[0][2].getValue() === getActivePlayer().marker &&
        board.getBoard()[1][1].getValue() === getActivePlayer().marker &&
        board.getBoard()[2][0].getValue() === getActivePlayer().marker) ||
      (board.getBoard()[0][0].getValue() === getActivePlayer().marker &&
        board.getBoard()[1][1].getValue() === getActivePlayer().marker &&
        board.getBoard()[2][2].getValue() === getActivePlayer().marker)
    ) {
      console.log(`${getActivePlayer().name} Wins the game`);
      return getActivePlayer().marker;
    } else if (
      board
        .getBoard()
        .flat()
        .filter((cell) => cell.getValue() === null).length == 0
    ) {
      console.log("It's A tie");
      return "tie";
    }
  };

  let gameOver = false;

  const getGameOver = () => gameOver;

  const playRound = (row, column) => {
    if (gameOver) {
      return;
    }
    console.log(
      `Marked ${getActivePlayer().name}'s marker into row ${row} column ${column}...`,
    );

    // Switch player turn
    if (board.drawMarker(row, column, getActivePlayer().marker)) {
      const winner = checkWinner();
      if (winner) {
        gameOver = true;
        return winner;
      }

      switchPlayerTurn();
    } else {
      console.log("Place is already taken");
    }

    printNewRound();
  };

  const resetGame = () => {
    board.resetBoard();
    activePlayer = players[0];
    gameOver = false;
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    checkWinner,
    getGameOver,
    resetGame,
  };
}

let game = GameController(); //exposed for testing purposes

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

    // Render board squares
    board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = cellIndex;
        cellButton.textContent =
          cell.getValue() == null ? "" : cell.getValue() == 1 ? "X" : "O";
        boardDiv.appendChild(cellButton);
      });
    });
  };

  // Add event listener for the board

  const resetButton = document.createElement("button");
  resetButton.classList.add("reset-button");
  resetButton.textContent = "Reset Game";
  const mainCont = document.querySelector(".container");
  function clickHandlerBoard(e) {
    if (game.getGameOver()) {
      return;
    }
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    if (selectedColumn == undefined || selectedRow == undefined) return;

    const result = game.playRound(selectedRow, selectedColumn);

    if (result == 1 || result == 2) {
      updateScreen();
      playerTurnDiv.textContent = `${game.getActivePlayer().name} Won the Game`;
      mainCont.appendChild(resetButton);
    } else if (result == "tie") {
      updateScreen();
      playerTurnDiv.textContent = `Its A tie`;
      mainCont.appendChild(resetButton);
    } else {
      updateScreen();
    }
  }
  resetButton.addEventListener("click", function () {
    game.resetGame();
    updateScreen();
    resetButton.remove();
  });
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}
const stButton = document.querySelector(".start-button");
stButton.addEventListener("click", function () {
  ScreenController();
  stButton.remove();
});
