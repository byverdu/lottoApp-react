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
      lastResult, date
    } = this.state.data;
    return(
      <div>
        {date}
        {lastResult}
      </div>
    )
  }
}

export default Results;
