import React, {PropTypes} from 'react';
import Board from 'components/Board';
import {addDebatePoint, toggleDebateBox} from '../actions';
import {connect} from 'react-redux';


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
  debatePoints: PropTypes.array.isRequired,
  activeDebatePoint: PropTypes.number.isRequired,
};

export default connect(select)(App);
