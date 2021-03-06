import React from 'react';
import axios from 'axios';
import Raffles from '../containers/lottos/raffles';
import Results from '../containers/lottos/results';
import Statistics from '../containers/lottos/statistics';
import Ball from '../components/ball';

const PRIMITVA = {
  totalBalls: 49,
  count: 6
}

const BONOLOTO = {
  totalBalls: 49,
  count: 6
} 

const EUROMILLIONS = {
  totalBalls: 50,
  count: 5
}

const LOTTO_ID = {
  primitiva: PRIMITVA,
  bonoloto: BONOLOTO,
  euromillions: EUROMILLIONS
}

const ENUM_COMPONENT = {
  raffles: 'raffles',
  results: 'results'
}

const mapValues = {
  raffles: {
    component: Raffles,
    prop: 'mostRepeated'
  },
  results: {
    component: Results,
    prop: 'lastResult'
  },
  statistics: {
    component: Statistics,
    prop: 'statistics'
  }
};

/**
 * @constant
 * @description Utils object with methods so it can take
 * responsability for repetitive tasks
 */
export const utils = {
  /**
   * @method serviceApi
   * @description Call Api endpoints
   * @param {string} enPoint last string for endpoint URL
   * @returns {Promise} from axios npm package
   */
  serviceApi: ( endPoint ) => {
    const BASE_URL = 'http://api.byverdu.es/';

    return axios.get( `${BASE_URL}${endPoint}` )
      .then( data => data );
  },

  /**
   * @method getRandomNumbers
   * @description Gets random numbers for a specific lottoId
   * @param {string} lottoId raffle id to work with
   * @returns {Array} Sorted random numbers
   */
  getRandomNumbers: ( count, totalBalls ) => {
    const randomNumbers = [];
    let counter = 1;

    while ( counter <= count ) {
      let random = Math.ceil( Math.random() * totalBalls );      
      if ( randomNumbers.indexOf( random ) === -1 ) {
        randomNumbers.push( random );
        counter += 1;
      }
    }
    return randomNumbers
      .map( random => random < 10 ? random = `0${random}` : random )
      .sort(( a, b ) => a - b );
  },

  /**
   * @method sortBy
   * @description Sorts an array by property specified
   * @param {string} type property to sort against
   * @param {Array} data array to sort
   * @returns void
   */
  sortBy: ( type, data ) => {
    switch( type ) {
    case 'count':
      data.sort(( a, b ) => b.count - a.count );
      break;
    case 'index':
      data.sort(( a, b ) => a.index - b.index );
      break;
    default:
      break;
    }
  },

  /**
   * @method checkRepeated
   * @description check what balls are repeated between last result
   * and saved combinations
   * @param {Array} lastResult array with last result
   * @param {Array} savedCombinations array with saved combinations
   * @param {String} lottoID 
   * @returns {Array} with indexes for repeated items
   */
  checkRepeated: ( lastResult, savedCombinations, lottoID ) => {
    const repeatedPositions = [];
    const isRepeated = ( saved ) => lastResult.indexOf( saved ) !== -1

    savedCombinations[ lottoID ].forEach( parent => {
      const temp = [];
      parent.forEach(( children, position ) => {
        if ( isRepeated( children )) {
          temp.push( position );
        }
      });
      repeatedPositions.push( temp );
    });
    return repeatedPositions;
  },

  /**
   * @method splitString
   * @description split a string with delimeter specified
   * @param {String} string string to work with
   * @param {String} delimiter delimiter to use
   * @returns {Array} with containing the string
   */
  splitString: ( string, delimiter ) => {
    return string.split( delimiter ).map( item => item.trim());
  },

  /**
   * @method buildLinkUrl
   * @description creates url to path dynamicly
   * @param {String} lottoName name actual lotto
   * @param {String} routeName url sufix
   * @returns {String} string for url
   */
  buildLinkUrl: ( lottoName, routeName ) => {
    return `/lottos/${lottoName}/${routeName}`;
  },

  /**
   * @method callbackRenderComponentRoute
   * @description callback passed to render prop in Route
   * @param {string} nameComponent name component
   * @param {Object} props component props
   * @returns {any} Component mapped with props
   */
  callbackRenderComponentRoute( nameComponent, props ) {

    const prop = mapValues[ nameComponent ].prop;
    const TempComponent = mapValues[ nameComponent ].component;
    const result = {
      [ prop ]: props[ prop ],
      lottoID: props.lottoID
    };

    let extraProps;
    switch( nameComponent ) {
    case ENUM_COMPONENT.raffles:
      extraProps = LOTTO_ID[ props.lottoID ];
      Object.assign( result, extraProps );
      break;
    case ENUM_COMPONENT.results:
      extraProps = {
        date: props.date
      };
      Object.assign( result, extraProps );
      break;
    default:
      break;
    };

    return () => <TempComponent data={ result } />
  },

  printBall( ballValues, color ) {
    return ballValues.map(( ball, key ) => {
      return(
        <Ball key={key} value={ball} color={color}/>
      );
    });
  },

  printInputBall( ballValues, isInput, onChangeHandler ) {
    return ballValues.map(( ball, key ) => {
      return(
        <Ball key={key} value={ball} isInput={isInput} onChangeHandler={onChangeHandler}/>
      );
    });
  }
};
