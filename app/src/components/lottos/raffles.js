import React, { Component } from 'react';

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
        {mostRepeated}
      </div>
    )
  }
}

export default Raffles;
