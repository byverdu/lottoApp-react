import axios from 'axios';

export const utils = {
  serviceApi: ( endPoint ) => {
    const baseUrl = 'http://api.byverdu.es/';

    return axios.get( `${baseUrl}${endPoint}`)
      .then( data => data );
  }
};
  
