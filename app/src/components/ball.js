import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ball extends Component {
  render() {
    console.log(this.props);
    const value = this.props.value;
    const color = this.props.color || '';
    return(
      <div className={"ball " + color}>
        {value}
      </div>
    )
  }
}

Ball.propTypes = {
  value: PropTypes.string.isRequired
}

export default Ball;
