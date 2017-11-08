import React, { Component } from 'react';

class Statistics extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.data
    }
  }

  render() {
    console.log(this.props)
    const {
      statistics
    } = this.state.data;
    return(
      <div>
        {statistics[ 0 ].color}
      </div>
    )
  }
}

export default Statistics;
