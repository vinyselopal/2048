const n = 4;
const goal = 2048;

const generateRandomCoord = (n) => Math.round(Math.random() * (n - 1));

const selectValue = () => {
  const values = [2, 4];
  return values[Math.round(Math.random())];
};

const createInitialPositions = (n) => {
  let position1 = [generateRandomCoord(n), generateRandomCoord(n)];
  let position2 = [generateRandomCoord(n), generateRandomCoord(n)];

  while (position1[0] === position2[0] && position1[1] === position2[1]) {
    position1[0] = generateRandomCoord(n);
  }

  return [position1, position2];
};

const createInitialBoard = (n) => {
  const [position1, position2] = createInitialPositions(n);


  const board = [];

  for (let i = 0; i < n; i++) {
    board.push([]);
    for (let j = 0; j < n; j++) {
      board[i][j] = 0;
    }
  }
  board[position1[0]][position1[1]] = selectValue();
  board[position2[0]][position2[1]] = selectValue();

  return board;
};

const createNewState = (action, board) => {
  const n = board.length;
  let changed = false
  let score = 0

  if (action === "right") {
    for (let i = 0; i < n; i++) {
      for (let j = n - 1; j >= 0; j--) {
        if (board[i][j] === 0) {
          let k = j - 1;

          while (k >= 0) {
            if (board[i][k] > 0) {
              board[i][j] = board[i][k];
              board[i][k] = 0;
              changed = true
              break;
            }
            k--;
          }
        }

        if (board[i][j] === 0) break;
        let k = j - 1;

        while (k >= 0) {
          if (board[i][k] === 0) {
            k--
            continue
          }
          if (board[i][k] > 0 && board[i][k] === board[i][j]) {
            board[i][j] = 2 * board[i][j];
            board[i][k] = 0;
            score += board[i][j]
            changed = true
          }
          break
        }
      }
    }
  }

  if (action === "left") {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 0) {
          let k = j + 1;

          while (k < n) {
            if (board[i][k] > 0) {
              board[i][j] = board[i][k];
              board[i][k] = 0;
              changed = true
              break;
            }
            k++;
          }
        }

        if (board[i][j] === 0) break;
        let k = j + 1;

        while (k < n) {
          if (board[i][k] === 0) {
            k++;
            continue
          }
          if (board[i][k] > 0 && board[i][k] === board[i][j]) {
            board[i][j] = 2 * board[i][j];
            board[i][k] = 0;
            score += board[i][j]
            changed = true
          }
          break;
        }
      }
    }
  }
  if (action === "down") {
    for (let i = 0; i < n; i++) {
      for (let j = n - 1; j >= 0; j--) {
        if (board[j][i] === 0) {
          let k = j - 1;

          while (k >= 0) {
            if (board[k][i] > 0) {
              board[j][i] = board[k][i];
              board[k][i] = 0;
              changed = true
              break;
            }
            k--;
          }
        }

        if (board[j][i] === 0) break;
        let k = j - 1;

        while (k >= 0) {
          if (board[k][i] === 0) {
            k--;
            continue
          }
          if (board[k][i] > 0 && board[k][i] === board[j][i]) {
            board[j][i] = 2 * board[j][i];
            board[k][i] = 0;
            score += board[j][i]

            changed = true
          }
          break
        }
      }
    }
  }
  if (action === "up") {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[j][i] === 0) {
          let k = j + 1;

          while (k < n) {
            if (board[k][i] > 0) {
              board[j][i] = board[k][i];
              board[k][i] = 0;
              changed = true
              break;
            }
            k++;
          }
        }

        if (board[j][i] === 0) break;
        let k = j + 1;

        while (k < n) {
          if (board[k][i] === 0) {
            k++;
            continue
          }
          if (board[k][i] > 0 &&  board[k][i] === board[j][i]) {
            board[j][i] = 2 * board[j][i];
            board[k][i] = 0;
            score += board[j][i]

            changed = true
          }
          break
        }
      }
    }
  }

  if (changed) {
    const [row, col] = createNewPosition(board)
    board[row][col] = selectValue()
  }
  
  console.log('new board')
  return [board, score];
};

const createNewPosition = (board) => {
  let position = [generateRandomCoord(n), generateRandomCoord(n)];

  while (board[position[0]][position[1]] !== 0) {
    position[0] = generateRandomCoord(n);
    position[1] = generateRandomCoord(n);
  }

  return position
};

const checkGameOver = (board) => {
  const n = board.length
  
  if (board.find(a => a.filter(a => a === 0).length)) return false

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === board[i+1][j] || board[i][j] === board[i][j+1]) return false
    }
  }
  for (let j = 0; j < n; j++) {
    if (board[3][j] === board[3][j + 1]) return false
  }


  return true
}

const board = createInitialBoard(n);

export {
  createInitialBoard,
  createNewState,
  checkGameOver
}
