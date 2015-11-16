import React, {PropTypes} from 'react';
import DebateThread from 'components/debate/DebateThread';

export default class DebatePoint extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onDebatePointClick(this.props.id);
  }

  render() {
    const {id, position: {x, y}, opened, messages} = this.props;
    const pointStyle = {top: y - 10, left: x - 10};

    return (
      <div className="debate" style={pointStyle}>
        <div className="debate__point" ref="target" onClick={this.handleClick}></div>
        <DebateThread id={id}
          opened={opened}
          onAddDebateThread={this.props.onAddDebateThread}
          messages={messages}
        />
      </div>
    );
  }
}

DebatePoint.propTypes = {
  id: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  opened: PropTypes.bool.isRequired,
  onDebatePointClick: PropTypes.func.isRequired,
  onAddDebateThread: PropTypes.func.isRequired,
};
