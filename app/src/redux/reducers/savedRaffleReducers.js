import {
  SAVE_RAFFLE, DELETE_RAFFLE
} from '../actions/savedRaffleActions';

function getInitialState() {
  const savedRaffle = window.localStorage.getItem(
    'savedRaffle'
  );
  if ( savedRaffle ) {
    return JSON.parse( savedRaffle );
  }
  return {
    euromillions: [],
    bonoloto: [],
    primitiva: []
  }
}

const initialState = getInitialState();

export function savedRaffleReducer( state = initialState, action ) {
  let startCount;
  let deleteCount;
  switch( action.type ) {
  case SAVE_RAFFLE:
    const newState = state[ action.lottoID ].slice();
    startCount = 0;
    deleteCount = 0;
    newState.splice( startCount, deleteCount, action.raffle );
    state[ action.lottoID ] = newState;
    return state;
  case DELETE_RAFFLE:
    return ;
  default:
    return initialState;
  }
}