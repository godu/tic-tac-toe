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

export type Position = [0 | 1 | 2, 0 | 1 | 2];


export const emptyBoard: Board = [
  [Cell.Empty, Cell.Empty, Cell.Empty],
  [Cell.Empty, Cell.Empty, Cell.Empty],
  [Cell.Empty, Cell.Empty, Cell.Empty]
];
export const setCellToRow = (
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

export const setCellToBoard = (
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

export const playerToCell = (player: Player) => {
  switch (player) {
    case Player.PlayerO:
      return Cell.O;
    case Player.PlayerX:
      return Cell.X;
  }
};

export const getOtherPlayer = (player: Player) =>
  player ? Player.PlayerO : Player.PlayerX;

export const playerToString = (player: Player) => {
  switch (player) {
    case Player.PlayerO:
      return "0";
    case Player.PlayerX:
      return "X";
  }
};

export const cellToString = (cell: Cell) => {
  switch (cell) {
    case Cell.O:
      return "0";
    case Cell.X:
      return "X";
    case Cell.Empty:
      return " ";
  }
};