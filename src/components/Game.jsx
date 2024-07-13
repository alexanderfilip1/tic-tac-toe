import React, { useEffect, useState } from "react";
import "./assets/css/TicTacToe.css";

export default function Game() {
  const gameTable = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [moves, setMoves] = useState(Array(gameTable.length).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

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

    let storedMoves = JSON.parse(localStorage.getItem("moves")) || [];
    storedMoves.push({ index: index, player: currentPlayer });
    localStorage.setItem("moves", JSON.stringify(storedMoves));

    setMoves(newMoves);
    const gameWinner = checkWinner(newMoves);

    if (gameWinner) {
      setWinner(gameWinner);
    } else if (!newMoves.includes("")) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  useEffect(() => {
    const savedMoves = JSON.parse(localStorage.getItem("moves"));
    if (savedMoves && savedMoves.length > 0) {
      const newMoves = Array(gameTable.length).fill("");
      savedMoves.forEach((move) => {
        newMoves[move.index] = move.player;
      });
      setMoves(newMoves);
      const lastMove = savedMoves[savedMoves.length - 1];
      setCurrentPlayer(lastMove.player === "X" ? "O" : "X");
      const gameWinner = checkWinner(newMoves);
      if (gameWinner) {
        setWinner(gameWinner);
      } else if (!newMoves.includes("")) {
        setIsDraw(true);
      }
    }
  }, []);

  return (
    <>
      <main className="main">
        <section className="main__gameSection">
          <h1>
            {winner
              ? `Winner: ${winner}`
              : isDraw
              ? "It's a draw!"
              : `Current Player: ${currentPlayer}`}
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
          <button
            type="button"
            className="restartBtn"
            onClick={() => {
              localStorage.removeItem("moves");
              setMoves(Array(gameTable.length).fill(""));
              setCurrentPlayer("X");
              setWinner(null);
              setIsDraw(false);
            }}
          >
            Restart Game
          </button>
        </section>
      </main>
    </>
  );
}
