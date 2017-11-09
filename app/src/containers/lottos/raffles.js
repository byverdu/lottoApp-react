import React, { Component } from 'react';
import { utils } from '../../utils/';

class Raffles extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.data
    }
  }

  get mostRepeated() {
    return this.props.data.mostRepeated;
  }

  get mostRepeatedBalls() {
    return utils.splitString( this.mostRepeated, ',' );
  }

  render() {
    return(
      <div>
        {utils.printBall( this.mostRepeatedBalls )}
      </div>
    )
  }
}

export default Raffles;
