import { Action as ReduxAction } from "redux";
import { Position, Player } from './domain';

export const ANSWER = "ANSWER";
export interface AnwserAction extends ReduxAction<"ANSWER"> {
  payload: {
    player: Player;
    position: Position;
  };
}
export const createAnswerAction = (
  player: Player,
  position: Position
): AnwserAction => ({
  type: ANSWER,
  payload: {
    player,
    position
  }
});

export const RESET = "RESET";
export interface ResetAction extends ReduxAction<"RESET"> { }
export const createResetAction = (): ResetAction => ({
  type: RESET
});

export type Action = AnwserAction | ResetAction;