import React, { useEffect, useState } from "react";
import "./assets/css/TicTacToe.css";

export default function Game() {
  const gameTable = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [moves, setMoves] = useState(Array(gameTable.length).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleClick = (index) => {
    const newMoves = [...moves];

    if (newMoves[index] === "") {
      newMoves[index] = currentPlayer;
      let storedMoves = JSON.parse(localStorage.getItem("moves")) || [];
      storedMoves.push({ index: index, player: currentPlayer });
      localStorage.setItem("moves", JSON.stringify(storedMoves));

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

      console.log("Last move:", newMoves[index]);

      setMoves(newMoves);
    }

    const whoIsWinner = () => {
      const winningTable = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 3, 9, 3, 5, 7, 1, 4, 7, 2, 5, 8, 3, 6, 9,
      ];
    };
  };

  useEffect(() => {
    const savedMoves = JSON.parse(localStorage.getItem("moves"));
    if (savedMoves && savedMoves.length > 0) {
      const newMoves = [...moves];
      savedMoves.forEach((move) => {
        newMoves[move.index] = move.player;
      });
      setMoves(newMoves);
      setCurrentPlayer(
        savedMoves[savedMoves.length - 1].player === "X" ? "O" : "X"
      );
    } else {
      return;
    }
  }, []);

  return (
    <>
      <main className="main">
        <section className="main__gameSection">
          <h1>
            Este rândul lui <b>{currentPlayer}</b>
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
            }}
          >
            Restart Game
          </button>
        </section>
      </main>
    </>
  );
}
