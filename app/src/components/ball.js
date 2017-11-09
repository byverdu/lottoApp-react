import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ball extends Component {
  render() {
    const value = this.props.value;
    const color = this.props.color || '';
    return(
      <div className={"ball " + color}>
        {value}
      </div>
    )
  }
}

export default Ball;
