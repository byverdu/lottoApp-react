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
    const newStateSave = state[ action.lottoID ].slice();
    startCount = 0;
    deleteCount = 0;
    newStateSave.splice( startCount, deleteCount, action.raffle );
    state[ action.lottoID ] = newStateSave;
    return state;
  case DELETE_RAFFLE:
    const newStateDelete = state[ action.lottoID ].slice();
    startCount = action.rafflePosition;
    deleteCount = 1;
    newStateDelete.splice( startCount, deleteCount );
    state[ action.lottoID ] = newStateDelete;
    return state;
  default:
    return initialState;
  }
}