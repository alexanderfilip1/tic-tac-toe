import React, { useEffect, useState } from "react";
import "./assets/css/TicTacToe.css";

export default function Game() {
  const gameTable = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [moves, setMoves] = useState(Array(gameTable.length).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner(newMoves) {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newMoves[a] &&
        newMoves[a] === newMoves[b] &&
        newMoves[a] === newMoves[c]
      ) {
        return newMoves[a];
      }
    }
    return null;
  }

  const handleClick = (index) => {
    if (moves[index] !== "" || winner || isDraw) {
      return;
    }

    const newMoves = [...moves];
    newMoves[index] = currentPlayer;

    const storedState = {
      moves: newMoves,
      currentPlayer: currentPlayer === "X" ? "O" : "X",
      winner: checkWinner(newMoves),
      isDraw: !newMoves.includes(""),
      player1,
      player2,
      isGameStarted: true,
    };

    if (storedState.winner) {
      storedState.winner = currentPlayer;
    }

    localStorage.setItem("gameState", JSON.stringify(storedState));

    setMoves(newMoves);
    setCurrentPlayer(storedState.currentPlayer);
    setWinner(storedState.winner);
    setIsDraw(storedState.isDraw);
  };

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("gameState"));
    if (savedState) {
      setMoves(savedState.moves);
      setCurrentPlayer(savedState.currentPlayer);
      setWinner(savedState.winner);
      setIsDraw(savedState.isDraw);
      setPlayer1(savedState.player1);
      setPlayer2(savedState.player2);
      setIsGameStarted(savedState.isGameStarted);
    }
  }, []);

  const handleStartGame = () => {
    if (player1 && player2) {
      const initialState = {
        moves: Array(gameTable.length).fill(""),
        currentPlayer: "X",
        winner: null,
        isDraw: false,
        player1,
        player2,
        isGameStarted: true,
      };
      localStorage.setItem("gameState", JSON.stringify(initialState));
      setIsGameStarted(true);
    }
  };

  const handleRestartGame = () => {
    const initialState = {
      moves: Array(gameTable.length).fill(""),
      currentPlayer: "X",
      winner: null,
      isDraw: false,
      player1,
      player2,
      isGameStarted: true,
    };
    localStorage.setItem("gameState", JSON.stringify(initialState));
    setMoves(Array(gameTable.length).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
    setIsGameStarted(true);
  };

  const handleChangePlayers = () => {
    setMoves(Array(gameTable.length).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
    setIsGameStarted(false);
    localStorage.removeItem("gameState");
  };

  return (
    <>
      <main className="main">
        {!isGameStarted ? (
          <section className="name__inputSection">
            <h1>Enter Player Names</h1>
            <div className="name__inputs">
              <label htmlFor="player1">
                Player1
                <input
                  type="text"
                  id="player1"
                  className="input"
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                />
              </label>
              <label htmlFor="player2">
                Player2
                <input
                  type="text"
                  id="player2"
                  className="input"
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                />
              </label>
            </div>
            <button onClick={handleStartGame} className="setNameBtn">
              Start Game
            </button>
          </section>
        ) : (
          <section className="main__gameSection">
            <h1>
              {winner
                ? `Winner: ${winner === "X" ? player1 : player2}`
                : isDraw
                ? "It's a draw!"
                : `Current Player: ${
                    currentPlayer === "X" ? player1 : player2
                  }`}
            </h1>
            <table className="game__table">
              <tbody>
                {gameTable.map((num, index) => {
                  if (index % 3 === 0) {
                    const rowItems = gameTable.slice(index, index + 3);
                    return (
                      <tr key={index}>
                        {rowItems.map((item, subIndex) => (
                          <td
                            className="cell"
                            key={index + subIndex}
                            value={item}
                            onClick={() => handleClick(index + subIndex)}
                          >
                            <button>{moves[index + subIndex]}</button>
                          </td>
                        ))}
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
            <div className="buttons">
              <button type="button" className="btn" onClick={handleRestartGame}>
                Restart Game
              </button>
              {(winner || isDraw) && (
                <button
                  type="button"
                  className="btn"
                  onClick={handleChangePlayers}
                >
                  Change Players
                </button>
              )}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
