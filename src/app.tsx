import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, Action, Store, StoreEnhancer } from "redux";

export enum Player {
  PlayerO,
  PlayerX
}
export enum Cell {
  Empty,
  O,
  X
}

export type Board = [
  [Cell, Cell, Cell],
  [Cell, Cell, Cell],
  [Cell, Cell, Cell]
];
type Position = [0 | 1 | 2, 0 | 1 | 2];

interface State {
  currentPlayer: Player;
  board: Board;
}
interface ResetAction extends Action<"reset"> {}
interface AnwserAction extends Action<"answer"> {
  payload: {
    player: Player;
    position: Position;
  };
}
const emptyBoard: Board = [
  [Cell.Empty, Cell.Empty, Cell.Empty],
  [Cell.Empty, Cell.Empty, Cell.Empty],
  [Cell.Empty, Cell.Empty, Cell.Empty]
];

const initState: State = {
  currentPlayer: Player.PlayerO,
  board: emptyBoard
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
  }
}

const setCellToRow = (
  columnIndex: 0 | 1 | 2,
  cell: Cell,
  [first, second, third]: [Cell, Cell, Cell]
): [Cell, Cell, Cell] => {
  switch (columnIndex) {
    case 0:
      return [cell, second, third];
    case 1:
      return [first, cell, third];
    case 2:
      return [first, second, cell];
  }
};
const setCellToBoard = (
  [rowIndex, columnIndex]: Position,
  cell: Cell,
  [first, second, third]: Board
): Board => {
  switch (rowIndex) {
    case 0: {
      const row = setCellToRow(columnIndex, cell, first);
      return [row, second, third];
    }
    case 1: {
      const row = setCellToRow(columnIndex, cell, second);
      return [first, row, third];
    }
    case 2: {
      const row = setCellToRow(columnIndex, cell, third);
      return [first, second, row];
    }
  }
};
const playerToCell = (player: Player) => {
  switch (player) {
    case Player.PlayerO:
      return Cell.O;
    case Player.PlayerX:
      return Cell.X;
  }
};

const getOtherPlayer = (player: Player) =>
  player ? Player.PlayerO : Player.PlayerX;
const playerToString = (player: Player) => {
  switch (player) {
    case Player.PlayerO:
      return "0";
    case Player.PlayerX:
      return "X";
  }
};
const cellToString = (cell: Cell) => {
  switch (cell) {
    case Cell.O:
      return "0";
    case Cell.X:
      return "X";
    case Cell.Empty:
      return " ";
  }
};

const createAnswerAction = (
  player: Player,
  position: Position
): AnwserAction => ({
  type: "answer",
  payload: {
    player,
    position
  }
});

const reduce = (
  state: State = initState,
  action: AnwserAction | ResetAction
): State => {
  switch (action.type) {
    case "reset": {
      return initState;
    }
    case "answer": {
      const {
        payload: { player, position }
      } = action;
      const { board } = state;
      const cell = playerToCell(player);
      return {
        currentPlayer: getOtherPlayer(player),
        board: setCellToBoard(position, cell, board)
      };
    }
  }
  return state;
};

const store: Store<State, AnwserAction | ResetAction> = createStore(
  reduce,
  {
    currentPlayer: Player.PlayerO,
    board: emptyBoard
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(update);

update();
let nextState: State;
function update() {
  const state = store.getState();
  if (nextState === state) return;
  nextState = state;
  const { currentPlayer, board } = state;
  return ReactDOM.render(
    <>
      <p>Player: {playerToString(currentPlayer)}</p>
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
                    console.log({ rowIndex, columnIndex, currentPlayer });
                    if (
                      (rowIndex === 0 || rowIndex === 1 || rowIndex === 2) &&
                      (columnIndex === 0 ||
                        columnIndex === 1 ||
                        columnIndex === 2)
                    )
                      store.dispatch(
                        createAnswerAction(currentPlayer, [
                          rowIndex,
                          columnIndex
                        ])
                      );
                  }}
                >
                  {cellToString(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>,
    document.getElementById("content")
  );
}
