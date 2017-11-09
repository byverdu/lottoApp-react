import React, { Component } from 'react';
import { utils } from '../../utils/';

class Raffles extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.data
    }
  }

  render() {
    console.log(this.props)
    const {
      mostRepeated
    } = this.state.data;
    return(
      <div>
        {utils.printBall( utils.splitString, mostRepeated )}
      </div>
    )
  }
}

export default Raffles;
