import React, { Component } from 'react';

class Raffles extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      mostRepeated: this.props.data
    }
  }

  render() {
    console.log(this.props)
    return(
      <div>
        {this.state.mostRepeated}
      </div>
    )
  }
}

export default Raffles;
