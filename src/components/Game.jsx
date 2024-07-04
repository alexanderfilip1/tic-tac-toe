import React, { useState } from "react";
import "./assets/css/TicTacToe.css";
export default function Game() {
  const gameTable = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [moves, setMoves] = useState(Array(gameTable.length).fill(""));

  const handleClick = (index) => {
    const newMoves = [...moves];
    newMoves[index] = "X";
    setMoves(newMoves);
  };
  return (
    <>
      <main className="main">
        <section className="main__gameSection">
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
              })}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
