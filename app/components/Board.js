import React, {PropTypes} from 'react';
import DebatePoint from 'components/DebatePoint';
import {NEW_DEBATE_POINT_ID} from 'utils/defaults';

const style = {
  boardContainer: {
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'auto',
  },
  image: {
    position: 'relative',
  },
};

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const {clientX, clientY} = event;
    const {left, top} = this.imageWrapper.getBoundingClientRect();
    this.props.onAddDebatePointClick({
      x: clientX - left,
      y: clientY - top,
    });
    this.props.onDebatePointClick(NEW_DEBATE_POINT_ID);
  }

  renderDebatePoints(items) {
    return Object.keys(items).map((id) => {
      const item = items[id];
      const {messages} = item;
      const position = {x: item.x, y: item.y};
      return (
        <DebatePoint key={`debate-point-${id}`}
          id={id}
          messages={messages}
          position={position}
          onDebatePointClick={this.props.onDebatePointClick}
          onAddDebateThread={this.props.onAddDebateThread}
          opened={this.props.activeDebatePoint === id}
        />
      );
    });
  }

  render() {
    const imgSrc = this.props.imgSrc;
    const items = this.props.debatePoints;

    return (
      <div style={style.boardContainer} ref={ref => this.container = ref}>
        <div style={style.image} ref={ref => this.imageWrapper = ref}>
          <img src={imgSrc} onClick={this.handleClick}/>
          {this.renderDebatePoints(items)}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  debatePoints: PropTypes.object.isRequired,
  activeDebatePoint: PropTypes.string,
  onAddDebatePointClick: PropTypes.func.isRequired,
  onDebatePointClick: PropTypes.func.isRequired,
  onAddDebateThread: PropTypes.func.isRequired,
};
