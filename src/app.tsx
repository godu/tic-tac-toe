
import * as ReactDOM from "react-dom";
import { State, createStore } from './store';
import { createAnswerAction } from './action';
import { View, ViewProps } from './view';
import { cellToString, playerToString } from "./domain";

let store = createStore();

const mapStateToProps = ({ currentPlayer, board }: State): ViewProps => ({
  playerName: playerToString(currentPlayer),
  board: board.map(row => row.map(cellToString)),
  onAnswer: ([rowIndex, columnIndex]) => {

    if ((rowIndex === 0 || rowIndex === 1 || rowIndex === 2) &&
      (columnIndex === 0 ||
        columnIndex === 1 ||
        columnIndex === 2))
      store.dispatch(
        createAnswerAction(currentPlayer, [rowIndex, columnIndex])
      );
  }
});

const update = () => {
  const state = store.getState();

  const props = mapStateToProps(state);
  const view = View(props);

  ReactDOM.render(view, document.getElementById("content"));
};
store.subscribe(update);
update();
