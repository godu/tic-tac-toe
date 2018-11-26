import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, Action, StoreEnhancer } from 'redux';

const INITIAL_STATE = 0;

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const reduce = (
  state: number = INITIAL_STATE,
  action: Action<'RESET'> | Action<'INCREMENT'> | Action<'DECREMENT'>
) => {
  switch (action.type) {
    case INCREMENT: {
      return state + 1;
    }
    case DECREMENT: {
      return state - 1;
    }
    case RESET: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
  }
}

const store = createStore(
  reduce,
  INITIAL_STATE,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

type ValueProps = { value: number };
const Value = ({ value }: ValueProps) => (
  <>
    <h1>{value}</h1>
  </>
);
type ButtonsProps = { onIncrement: () => void, onDecrement: () => void, onReset: () => void };
const Buttons = (props: ButtonsProps) => {
  const { onIncrement, onDecrement, onReset } = props;
  return (
    <>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onReset}>R</button>
    </>
  );
};
type AppProps = ValueProps & ButtonsProps;
const App = ({ value, onIncrement, onDecrement, onReset }: AppProps) => (
  <>
    <Value value={value} />
    <Buttons onIncrement={onIncrement} onDecrement={onDecrement} onReset={onReset} />
  </>
);

const update = (state: number) => {
  const view = <App
    value={state}
    onIncrement={() =>
      store.dispatch({
        type: INCREMENT
      })
    }
    onDecrement={() =>
      store.dispatch({
        type: DECREMENT
      })}
    onReset={() =>
      store.dispatch({
        type: RESET
      })}
  />

  ReactDOM.render(
    view,
    document.getElementById('content')
  );
}

store.subscribe(() => update(store.getState()));
update(store.getState());
