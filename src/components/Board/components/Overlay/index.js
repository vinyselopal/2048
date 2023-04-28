const Overlay = ({ gameOver, resetBoard, goalReached }) => {
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
      {goalReached ? (
        <div className="goal-reached">
          <p className="you-won-message">You Won!</p>
          <button className="play-again-button" onClick={resetBoard}>
            Play Again
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Overlay;
