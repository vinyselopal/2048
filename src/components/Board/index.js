import GameOver from "./components/GameOver";

const Board = ({ gameOver, resetBoard, board }) => {
  return (
    <div className="board">
      <GameOver gameOver={gameOver} resetBoard={resetBoard} />
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
