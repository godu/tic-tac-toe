import { createStore as createReduxStore, Store, StoreEnhancer } from "redux";
import { Action, RESET, ANSWER } from './action'
import { Player, Board, emptyBoard, playerToCell, getOtherPlayer, setCellToBoard } from './domain'

export interface State {
  currentPlayer: Player;
  board: Board;
}

export const INITIAL_STATE: State = {
  currentPlayer: Player.PlayerO,
  board: emptyBoard
};

const reduce = (
  state: State = INITIAL_STATE,
  action: Action
): State => {
  switch (action.type) {
    case RESET: {
      return INITIAL_STATE;
    }
    case ANSWER: {
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

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
  }
}

export const createStore = (initialState = INITIAL_STATE): Store<State, Action> =>
  createReduxStore(
    reduce,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
