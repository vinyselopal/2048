const Header = ({score, bestScore, resetBoard}) => {
    return (
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
    )
}

export default Header