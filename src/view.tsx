import * as React from "react";


export interface ViewProps {
  playerName: string,
  board: string[][],
  onAnswer: (position: [number, number]) => void
};

export const View = (
  {
    playerName,
    board,
    onAnswer
  }:
    ViewProps
) => (
    <>
      <p>Player: {playerName}</p>
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td
                  style={{
                    border: "black 1px solid",
                    width: "1em",
                    height: "1em"
                  }}
                  key={columnIndex}
                  onClick={() => {
                    onAnswer([rowIndex, columnIndex])
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );