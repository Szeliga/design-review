import React, {PropTypes} from 'react';
import cs from 'classnames';
import {NEW_DEBATE_POINT_ID} from 'utils/defaults';

export default class DebateThread extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onAddDebateThread(this.refs.message.value);
  }

  renderContent() {
    const {id, messages} = this.props;
    if (id === NEW_DEBATE_POINT_ID) {
      return (
        <div className="row">
          <div className="input-field col s8">
            <input name="message" type="text" ref="message"/>
            <label htmlFor="message">Message</label>
          </div>
          <div className="input-field field col s4">
            <button type="submit" className="waves-effect waves-light btn" onClick={this.handleClick}>Save!</button>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col s12">
          {messages.map((item, i) => {return <div key={i}>{item}</div>;})}
        </div>
      </div>
    );
  }

  render() {
    const {opened} = this.props;
    const boxClass = cs('debate__box', {'debate__box--opened': opened});

    return (
      <div className={boxClass}>
        {this.renderContent()}
      </div>
    );
  }
}

DebateThread.propTypes = {
  id: PropTypes.string.isRequired,
  messages: PropTypes.array,
  opened: PropTypes.bool.isRequired,
  onAddDebateThread: PropTypes.func.isRequired,
};
