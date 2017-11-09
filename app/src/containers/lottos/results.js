import React, { Component } from 'react';
import { utils } from '../../utils/';

class Results extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.data
    }
  }

  get lastResult() {
    return this.props.data.lastResult;
  }

  get lastResultBalls() {
    return utils.splitString( this.lastResult, ',' );
  }

  render() {
    const {
      date
    } = this.state.data;
    return(
      <div>
        <h1>
          {date}
        </h1>
        {utils.printBall( this.lastResultBalls )}
      </div>
    )
  }
}

export default Results;
