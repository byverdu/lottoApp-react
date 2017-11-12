import React, { Component } from 'react';
import { utils } from '../../utils/';
import { connect } from 'react-redux';
import { savedRaffleAction } from '../../redux/actions/savedRaffleActions';

class Raffles extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.data,
      selectedNumbers: [],
      savedCount: this.savedCount
    }
    this.onChangeHandler = this.onChangeHandler.bind( this );
    this.clearHandler = this.clearHandler.bind( this );
    this.randomHandler = this.randomHandler.bind( this );
    this.saveHandler = this.saveHandler.bind( this );
    this.buttonsBuilder = this.buttonsBuilder.bind( this );
  }

  // lifeCycle methods

  componentDidMount() {
    const localStorageID = window.localStorage.getItem(
      this.localStorageID
    );
    if ( localStorageID ) {
      const parsedJSON = JSON.parse( localStorageID );
      this.setState({ selectedNumbers: parsedJSON })
    }
  }

  componentWillUnmount() {
    window.localStorage.setItem(
      this.localStorageID,
      JSON.stringify( this.state.selectedNumbers )
    );
    window.localStorage.setItem(
      'savedRaffle',
      JSON.stringify( this.props.savedRaffle )
    );
  }

  // Getters

  get mostRepeated() {
    return this.props.data.mostRepeated;
  }

  get mostRepeatedBalls() {
    return utils.splitString( this.mostRepeated, ',' );
  }

  get rafflesCount() {
    return this.state.data.count;
  }

  get rafflesTotalBalls() {
    return this.state.data.totalBalls;
  }
 
  get raffleBalls() {
    const ballsInRaffle = [];
    const totalBalls = this.rafflesTotalBalls;

    for ( let i = 1; i <= totalBalls; i++ ) {
      if ( i < 10 ) {
        i = `0${i}`;
      }
      ballsInRaffle.push( i );
    }

    return ballsInRaffle;
  }

  get lottoID() {
    return this.state.data.lottoID;
  }

  get localStorageID() {
    return `${this.lottoID}SavedRaffle`;
  }

  get savedCount() {
    return this.props.savedRaffle[ this.props.data.lottoID ].length;
  }

  // repeaters

  buttonsBuilder() {
    const btnData = [
      { text: 'Clear', action: this.clearHandler },
      { text: 'Random', action: this.randomHandler },
      { text: 'Save', action: this.saveHandler }
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

  onChangeHandler( event ) {
    const value = event.target.value;
    const selectedNumbers = this.state.selectedNumbers;
    const positionAt = selectedNumbers.indexOf( value );
    if ( positionAt === -1 ) {
      selectedNumbers.push( value );
    } else {
      selectedNumbers.splice( positionAt, 1 );
    }
    selectedNumbers.sort(( a, b ) => a - b );
    if ( selectedNumbers.length > this.rafflesCount ) {
      event.target.checked = false;
      return;
    }
    this.setState({selectedNumbers: selectedNumbers})
  }

  clearHandler() {
    Array.from( document.querySelectorAll( 'input:checked' ))
      .forEach( element => element.checked = false );
    this.setState({selectedNumbers: []})
    window.localStorage.removeItem( this.localStorageID );
  }

  randomHandler() {
    const randomValues = utils.getRandomNumbers(
      this.rafflesCount, this.rafflesTotalBalls
    )
    this.setState({selectedNumbers: randomValues})
  }

  saveHandler() {
    this.props.dispatch( savedRaffleAction(
      this.lottoID, this.state.selectedNumbers
    ));
    this.setState({savedCount: this.savedCount})    
  }

  render() {
    return(
      <div>
        <div>
          {utils.printBall( this.mostRepeatedBalls )}
        </div>
        <hr />
        <div>
          {utils.printInputBall( this.raffleBalls, true, this.onChangeHandler )}
        </div>
        <div>
          <h3>
            Selected numbers
          </h3>
          <h6>
            SavedRaffle {this.state.savedCount}
          </h6>
          <div>
            {this.buttonsBuilder()}
          </div>
          {utils.printBall( this.state.selectedNumbers, 'orangeItem' )}          
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

export default connect( mapStateToProps )( Raffles );
