import Overlay from "./components/Overlay";

const Board = ({ gameOver, resetBoard, board, goalReached }) => {
  return (
    <div className="board">
      <Overlay
        gameOver={gameOver}
        resetBoard={resetBoard}
        goalReached={goalReached}
      />
      {board.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((cell, j) => (
            <div className={`board-cell cell-${cell} `} key={j}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
