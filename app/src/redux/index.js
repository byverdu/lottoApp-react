import { utils } from '../utils/';
import { combineReducers } from 'redux'

export const REQUEST_API = 'REQUEST_API';
export const PRE_REQUEST_API = 'PRE_REQUEST_API';
export const RECEIVE_FROM_API = 'RECEIVE_FROM_API';

function requestToApi( endPoint ) {
  return {
    type: REQUEST_API,
    endPoint
  }
}

function receiveFromApi( endPoint, json ) {
  return {
    type: RECEIVE_FROM_API,
    isFetching: false,    
    endPoint,
    json
  }
}

export function preFetch() {
  return {
    type: PRE_REQUEST_API,
    isFetching: true
  }
}

export function fetchLottos( endPoint ) {
  return function( dispatch ) {
    dispatch( requestToApi( endPoint ));

    return utils.serviceApi( endPoint )
      .then(
        response => receiveFromApi( endPoint, response )
      );
    
  }
}

// const initialState = {
//   color: 'green'
// };

// export function changeColorReducer ( state = initialState, action ) {
//   switch ( action.type ) {
//   case 'CHANGE_COLOR':
//     return Object.assign({}, state, {color: action.color});
//   default:
//     return state;
//   }
// }

const rootReducer = combineReducers({
  preFetch,
  fetchLottos
})

export default rootReducer