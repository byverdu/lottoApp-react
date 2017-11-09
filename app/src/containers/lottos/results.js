import React, { Component } from 'react';
import { utils } from '../../utils/';

class Results extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.data
    }
  }

  render() {
    const {
      lastResult, date
    } = this.state.data;
    return(
      <div>
        <h1>
          {date}
        </h1>
        {utils.printBall( utils.splitString, lastResult )}
      </div>
    )
  }
}

export default Results;
