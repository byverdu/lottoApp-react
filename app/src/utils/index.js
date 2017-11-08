import React from 'react';
import axios from 'axios';
import Raffles from '../components/lottos/raffles';
import Results from '../components/lottos/results';

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
  getRandomNumbers: ( lottoId ) => {
    const data = LOTTO_ID[ lottoId ];
    const randomNumbers = [];
    let counter = 1;

    while ( counter <= data.count ) {
      const random = Math.floor( Math.random() * data.totalBalls );      
      if ( randomNumbers.indexOf( random ) === -1 ) {
        randomNumbers.push( random );
        counter += 1;
      }
    }
    return randomNumbers.sort(( a, b ) => a - b );
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
   * @returns {Array} with indexes for repeated items
   */
  checkRepeated: ( lastResult, savedCombinations ) => {
    const repeatedPositions = [];
    const isRepeated = ( saved ) => lastResult.indexOf( saved ) !== -1

    savedCombinations.forEach( parent => {
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
    const mapValues = {
      raffles: {
        component: Raffles,
        prop: 'mostRepeated'
      },
      results: {
        component: Results,
        prop: 'lastResult'
      }
    };

    const prop = mapValues[ nameComponent ].prop;
    const TempComponent = mapValues[ nameComponent ].component;
    const result = {
      [ prop ]: props[ prop ]
    };

    if ( nameComponent === ENUM_COMPONENT.raffles ) {
      const extraProps = LOTTO_ID[ props.lottoID ];
      Object.assign( result, extraProps );
    }

    return () => <TempComponent data={ result } />
  }
};
