import React, { Component } from 'react';

class Ball extends Component {
  render() {
    const {
      value, color, isInput, onChangeHandler
    } = this.props;
    if ( isInput ) {
      return(
        <label htmlFor={"number" + value}>
          <input
            type="checkbox"
            value={value}
            id={"number" + value}
            onChange={onChangeHandler}
          />
          <span className="ball">
            {value}
          </span>
        </label>
      );
    } else {
      return(
        <div className={"ball " + color}>
          {value}
        </div>
      );
    }
  }
}

export default Ball;
