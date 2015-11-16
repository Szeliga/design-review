import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Board from 'components/Board';
import {addDebatePoint, toggleDebateBox, addDebateThread} from 'app/actions';


class App extends React.Component {
  render() {
    const dispatch = this.props.dispatch;

    return (
      <Board imgSrc={this.props.imgUrl}
        activeDebatePoint={this.props.activeDebatePoint}
        debatePoints={this.props.debatePoints}
        onAddDebatePointClick={point => {
          dispatch(addDebatePoint(point));
        }}
        onDebatePointClick={index => {
          dispatch(toggleDebateBox(index));
        }}
        onAddDebateThread={(message) => {
          dispatch(addDebateThread(message));
        }}
      />
    );
  }
}

function select(state) {
  return state;
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  debatePoints: PropTypes.object.isRequired,
  activeDebatePoint: PropTypes.string,
};

export default connect(select)(App);
