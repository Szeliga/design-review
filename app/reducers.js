import uuid from 'node-uuid';

import {ADD_DEBATE_POINT, TOGGLE_DEBATE_BOX, ADD_DEBATE_THREAD} from 'app/actions';
import {NEW_DEBATE_POINT_ID} from 'utils/defaults';

const initialState = {
  imgUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/b9f00d29023019.55de188969ed7.jpg',
  debatePoints: {},
  activeDebatePoint: null,
};

export default function designReviewApp(state = initialState, action) {
  switch (action.type) {
  case ADD_DEBATE_POINT:
    const debatePoints = Object.assign({}, state.debatePoints, {
      [NEW_DEBATE_POINT_ID]: {
        x: action.x,
        y: action.y,
        messages: [],
      },
    });
    return Object.assign({}, state, {debatePoints});

  case TOGGLE_DEBATE_BOX:
    if (action.id === NEW_DEBATE_POINT_ID && state.activeDebatePoint === NEW_DEBATE_POINT_ID) {
      return state;
    }

    const id = action.id === state.activeDebatePoint ? null : action.id;
    return Object.assign({}, state, {activeDebatePoint: id});

  case ADD_DEBATE_THREAD:
    const newId = uuid.v4();
    const newDebatePoint = Object.assign({}, state.debatePoints[NEW_DEBATE_POINT_ID]);
    newDebatePoint.messages = [action.message];
    const items = Object.assign({}, state.debatePoints, {
      [newId]: newDebatePoint,
    });
    delete(items[NEW_DEBATE_POINT_ID]);
    return Object.assign({}, state,
      {debatePoints: items},
      {activeDebatePoint: newId}
    );

  default:
    return state;
  }
}
