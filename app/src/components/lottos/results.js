import React, { Component } from 'react';

class Results extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.data
    }
  }

  render() {
    const {
      lastResult
    } = this.state.data;
    return(
      <div>
        {lastResult}
      </div>
    )
  }
}

export default Results;
