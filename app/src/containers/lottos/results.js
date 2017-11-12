import React, { Component } from 'react';
import { utils } from '../../utils/';
import { connect } from 'react-redux';

class Results extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.data
    }
    this.printSavedRaffle = this.printSavedRaffle.bind( this );
  }

  // Getters

  get lastResult() {
    return this.props.data.lastResult;
  }

  get lastResultBalls() {
    return utils.splitString( this.lastResult, ',' );
  }

  get lottoID() {
    return this.state.data.lottoID;
  }

  printSavedRaffle() {
    return this.props.savedRaffle[ this.lottoID ].map(( ball, key ) => {
      return(
        <div key={key}>
          {utils.printBall( ball )}
        </div>
      )
    });
  }

  render() {
    const {
      date
    } = this.state.data;
    return(
      <div>
        <h1>
          {date}
        </h1>
        {utils.printBall( this.lastResultBalls )}
        <div>
          <h5>
            SavedRaffle
          </h5>
          {this.printSavedRaffle()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = function( store ) {
  return {
    savedRaffle: store.savedRaffle
  };
}

export default connect( mapStateToProps )( Results );
