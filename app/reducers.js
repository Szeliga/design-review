// TODO: Add id to debate points so we can track clicks on them
import {ADD_DEBATE_POINT, TOGGLE_DEBATE_BOX} from './actions';

const initialState = {
  imgUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/b9f00d29023019.55de188969ed7.jpg',
  debatePoints: [],
  activeDebatePoint: -1,
};

export default function designReviewApp(state = initialState, action) {
  switch (action.type) {
  case ADD_DEBATE_POINT:
    const points = [...state.debatePoints, {
      x: action.x,
      y: action.y,
      opened: action.opened,
    }];
    return Object.assign({}, state, {debatePoints: points});
  //
  case TOGGLE_DEBATE_BOX:
    const index = state.activeDebatePoint === action.index ? -1 : action.index;
    return Object.assign({}, state, {activeDebatePoint: index});

  default:
    return state;
  }
}
