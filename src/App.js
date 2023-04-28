import "./App.css";
import { createInitialBoard, createNewState, checkGameOver } from "./game";

import { useState, useEffect, useLayoutEffect } from "react";

function App() {
  const [size, setSize] = useState(4);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem('bestScore')) || 0)

  const [board, setBoard] = useState(createInitialBoard(size));

  const changeBoardState = (e) => {
    const boardCopy = board.map((r) => r.map((v) => v));

    if (e.key === "ArrowLeft") {
      const [newBoard, newScore] = createNewState("left", boardCopy);
      setBoard(newBoard);
      setScore((score) => score + newScore);
    }

    if (e.key === "ArrowRight") {
      const [newBoard, newScore] = createNewState("right", boardCopy);
      setBoard(newBoard);
      setScore(score => score + newScore);
    }

    if (e.key === "ArrowUp") {
      const [newBoard, newScore] = createNewState("up", boardCopy);
      setBoard(newBoard);
      setScore(score => score + newScore);
    }

    if (e.key === "ArrowDown") {
      const [newBoard, newScore] = createNewState("down", boardCopy);
      setBoard(newBoard);
      setScore(score => score + newScore);
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(() => createInitialBoard(size));
    setScore(0)
  };

  useEffect(() => {
    if (score > bestScore) {
      localStorage.setItem('bestScore', score)
      setBestScore(score)
    }
  }, [score, bestScore])

  useEffect(() => {
    window.addEventListener("keydown", changeBoardState);

    return () => {
      window.removeEventListener("keydown", changeBoardState);
    };
  }, [board]);

  useEffect(() => {
    if (checkGameOver(board)) setGameOver(true);
  }, [board]);

  return (
    <div className="App">
      <header className="header">
        <div className="title-2048">
          <h1>2048</h1>
        </div>
        <div className="right-div">
          <div className="score">
            <div className="current-score">
              <div>Score</div>
              <div>{score}</div>
            </div>
            <div className="best-score">
              <div>Best</div>
              <div>{bestScore}</div>
            </div>
          </div>
          <div className="new-game-container">
            <button className="new-game"
            onClick={resetBoard}>New Game</button>
          </div>
      </div>
      </header>
      <div className="board">
        {gameOver ? (
          <div className="game-over">
            <p className="game-over-message">Game Over!</p>
            <button className="try-again-button" onClick={resetBoard}>
              Try again
            </button>
          </div>
        ) : null}
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
    </div>
  );
}

export default App;
