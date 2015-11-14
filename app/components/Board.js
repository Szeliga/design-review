import React, {PropTypes} from 'react';
import DebatePoint from 'components/DebatePoint';

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
    this.props.onDebatePointClick(this.props.debatePoints.length);
  }

  renderDebatePoints(items) {
    return items.map((item, i) => {
      const position = {x: item.x, y: item.y};
      return (
        <DebatePoint key={`debate-point-${i}`}
          index={i}
          position={position}
          onDebatePointClick={this.props.onDebatePointClick}
          opened={this.props.activeDebatePoint === i}
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
  debatePoints: PropTypes.array.isRequired,
  activeDebatePoint: PropTypes.number.isRequired,
  onAddDebatePointClick: PropTypes.func.isRequired,
  onDebatePointClick: PropTypes.func.isRequired,
};
