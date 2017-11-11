import React, { Component } from 'react';
import { utils } from '../../utils/';

class Raffles extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.data,
      selectedNumbers: []
    }
    console.log(props)
    this.onChangeHandler = this.onChangeHandler.bind( this );
    this.clearHandler = this.clearHandler.bind( this );
    this.randomHandler = this.randomHandler.bind( this );
  }

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

  onChangeHandler( event ) {
    console.log(event.target.value);
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
  }

  randomHandler() {
    const randomValues = utils.getRandomNumbers(
      this.rafflesCount, this.rafflesTotalBalls
    )
    this.setState({selectedNumbers: randomValues})    
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
          <div>
            <button onClick={this.clearHandler}>
              Clear
            </button>
            <button onClick={this.randomHandler}>
              Random
            </button>
          </div>
          {utils.printBall( this.state.selectedNumbers, 'orangeItem' )}          
        </div>
      </div>
    )
  }
}

export default Raffles;
