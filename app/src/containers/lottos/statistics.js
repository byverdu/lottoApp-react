import React, { Component } from 'react';
import Ball from '../../components/ball';
import { utils } from '../../utils/';

class Statistics extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      statistics: this.props.data.statistics
    }

    this.ballRepeater = this.ballRepeater.bind( this );
    this.sortBy = this.sortBy.bind( this );
  }

  get statistics() {
    return this.state.statistics;
  }

  ballRepeater() {
    return this.statistics.map(( stat, key ) => {
      return(
        <div className="stats" key={key}>
          <Ball value={stat.index} color={stat.color} />
          <h4>
            {stat.count}
          </h4>
        </div>
      );
    });
  }

  sortBy( type ) {
    utils.sortBy( type, this.statistics );
    this.setState({statistics: this.statistics})
  }

  render() {
    return(
      <div>
        <button onClick={ () => this.sortBy( 'count' ) }>
          Sort by count
        </button>
        <button onClick={ () => this.sortBy( 'index' ) }>
          Sort by index
        </button>
        {this.ballRepeater()}
      </div>
    )
  }
}

export default Statistics;
