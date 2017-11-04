import React, { Component } from 'react';

class Results extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      lastResult: this.props.data.lastResult
    }
  }

  render() {
    return(
      <div>
        {this.state.lastResult}
      </div>
    )
  }
}

export default Results;
