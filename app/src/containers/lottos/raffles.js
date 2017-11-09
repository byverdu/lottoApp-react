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

  get raffleBalls() {
    const ballsInRaffle = [];
    const totalBalls = this.props.data.totalBalls;

    for ( let i = 1; i <= totalBalls; i++ ) {
      ballsInRaffle.push( i );
    }

    return ballsInRaffle;
  }

  render() {
    return(
      <div>
        <div>
          {utils.printBall( this.mostRepeatedBalls )}
        </div>
        <hr />
        <div>
          {utils.printBall( this.raffleBalls )}
        </div>
      </div>
    )
  }
}

export default Raffles;
