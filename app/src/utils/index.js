import axios from 'axios';

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

/**
 * @constant
 * @description Utils object with methods so it can take
 * responsability for repetitive tasks
 */
export const utils = {
  /**
   * @method
   * @description Call Api endpoints
   * @param {string} enPoint last string for endpoint URL
   * @returns {Promise} from axios npm package
   */
  serviceApi: ( endPoint ) => {
    const BASE_URL = 'http://api.byverdu.es/';

    return axios.get( `${BASE_URL}${endPoint}`)
      .then( data => data );
  },

  /**
   * @method
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
      if (randomNumbers.indexOf(random) === -1) {
        randomNumbers.push(random);
        counter += 1;
      }
    }
    return randomNumbers.sort(( a, b ) => a - b);
  }
};
  
