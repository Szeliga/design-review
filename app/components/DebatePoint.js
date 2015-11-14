import React, {PropTypes} from 'react';
import TetherElement from 'react-tether';
import cs from 'classnames';

export default class DebatePoint extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onDebatePointClick(this.props.index);
  }

  render() {
    const {position: {x, y}, opened} = this.props;
    const pointStyle = {top: y - 10, left: x - 10};
    const boxClass = cs('debate__box', {'debate__box--opened': opened});

    return (
      <div className="debate" style={pointStyle}>
        <div className="debate__point" ref="target" onClick={this.handleClick}></div>
        {
          <TetherElement
            target={this.refs.target}
            options={{
              attachment: `top left`,
              targetAttachment: `top right`,
              constraints: [
                {
                  to: 'scrollParent',
                  attachment: 'together',
                  pinned: true,
                },
              ],
            }}
          >
            <div className={boxClass}>Hello</div>
          </TetherElement>
        }
      </div>
    );
  }
}

DebatePoint.propTypes = {
  index: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  opened: PropTypes.bool.isRequired,
  onDebatePointClick: PropTypes.func.isRequired,
};
