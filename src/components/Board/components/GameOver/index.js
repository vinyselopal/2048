const GameOver = ({ gameOver, resetBoard }) => {
  return (
    <>
      {gameOver ? (
        <div className="game-over">
          <p className="game-over-message">Game Over!</p>
          <button className="try-again-button" onClick={resetBoard}>
            Try again
          </button>
        </div>
      ) : null}
    </>
  );
};

export default GameOver;
