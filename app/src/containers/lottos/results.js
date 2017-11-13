import React, { Component } from 'react';
import { utils } from '../../utils/';
import { connect } from 'react-redux';
import { deleteRaffleAction } from '../../redux/actions/savedRaffleActions';

class Results extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.data
    }
    this.printSavedRaffle = this.printSavedRaffle.bind( this );
    this.clearHandler = this.clearHandler.bind( this );
    this.checkHandler = this.checkHandler.bind( this );
    this.buttonsBuilder = this.buttonsBuilder.bind( this );    
    this.deleteHandler = this.deleteHandler.bind( this );    
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
        <div key={key} ref={"row" + key}>
          {utils.printBall( ball )}
          <button onClick={() => this.deleteHandler( key )}>
            Delete
          </button>
        </div>
      )
    });
  }

  // repeaters

  buttonsBuilder() {
    const btnData = [
      { text: 'Clear', action: this.clearHandler },
      { text: 'Check', action: this.checkHandler }
    ];

    return btnData.map(( btn, key ) => {
      return(
        <button key={key} onClick={btn.action}>
          {btn.text}
        </button>
      );
    });
  }

  // event handlers

  clearHandler() {
    Array.from(
      document.querySelectorAll( '.redItem' )
    ).forEach( elem => elem.classList.remove( 'redItem' ));
  }

  checkHandler() {
    const repeated = utils.checkRepeated(
      this.lastResult,
      this.props.savedRaffle,
      this.lottoID
    );

    const posRepeated = repeated.map(( checked, index ) => {
      if ( checked.length > 0 ) {
        return index;
      }
    })
  
    posRepeated.forEach(( repeatedItem, index ) => {
      if ( repeatedItem ) {
        const allBalls = this.refs[ `row${repeatedItem}` ].getElementsByClassName( 'ball' );

        for ( let i = 0; i < repeated[ index ].length; i ++ ) {
          allBalls[ repeated[ index ][ i ] ].classList.add( 'redItem' );
        }
      }
    });

  }
  
  deleteHandler( id ) {
    this.refs[ `row${id}` ].remove();
    this.props.dispatch( deleteRaffleAction( this.lottoID, id ));
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
          <div>
            {this.buttonsBuilder()}
          </div>
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
