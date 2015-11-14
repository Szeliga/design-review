/*
 * Action Types
 */

export const ADD_DEBATE_POINT = 'ADD_DEBATE_POINT';
export const TOGGLE_DEBATE_BOX = 'TOGGLE_DEBATE_BOX';

/*
 * Action creators
 */

export function addDebatePoint({x, y, opened}) {
  return {type: ADD_DEBATE_POINT, x, y, opened};
}

export function toggleDebateBox(index) {
  return {type: TOGGLE_DEBATE_BOX, index};
}
