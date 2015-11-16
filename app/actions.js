/*
 * Action Types
 */

export const ADD_DEBATE_POINT = 'ADD_DEBATE_POINT';
export const TOGGLE_DEBATE_BOX = 'TOGGLE_DEBATE_BOX';
export const ADD_DEBATE_THREAD = 'ADD_DEBATE_THREAD';

/*
 * Action creators
 */

export function addDebatePoint({x, y, opened}) {
  return {type: ADD_DEBATE_POINT, x, y, opened};
}

export function toggleDebateBox(id) {
  return {type: TOGGLE_DEBATE_BOX, id};
}

export function addDebateThread(message) {
  return {type: ADD_DEBATE_THREAD, message};
}
