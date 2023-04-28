import "./App.css";
import { createInitialBoard, createNewState, checkGameOver } from "./game";
import Header from "./components/Header";
import Board from "./components/Board";
import { getFromLocalStorage, saveToLocalStorage } from "./utils";

import { useState, useEffect } from "react";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [size, setSize] = useState(4);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    getFromLocalStorage("bestScore") || 0
  );

  const [board, setBoard] = useState(
    getFromLocalStorage("board") || createInitialBoard(size)
  );

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
      setScore((score) => score + newScore);
    }

    if (e.key === "ArrowUp") {
      const [newBoard, newScore] = createNewState("up", boardCopy);
      setBoard(newBoard);
      setScore((score) => score + newScore);
    }

    if (e.key === "ArrowDown") {
      const [newBoard, newScore] = createNewState("down", boardCopy);
      setBoard(newBoard);
      setScore((score) => score + newScore);
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(() => createInitialBoard(size));
    setScore(0);
  };

  useEffect(() => {
    if (score > bestScore) {
      saveToLocalStorage("bestScore", score);
      setBestScore(score);
    }
  }, [score, bestScore]);

  useEffect(() => {
    window.addEventListener("keydown", changeBoardState);

    saveToLocalStorage("board", board);
    return () => {
      window.removeEventListener("keydown", changeBoardState);
    };
  }, [board]);

  useEffect(() => {
    if (checkGameOver(board)) setGameOver(true);
  }, [board]);

  return (
    <div className="App">
      <Header score={score} bestScore={bestScore} resetBoard={resetBoard} />
      <Board gameOver={gameOver} resetBoard={resetBoard} board={board} />
    </div>
  );
}

export default App;
