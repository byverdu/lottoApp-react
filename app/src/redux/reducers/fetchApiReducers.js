import {
  PRE_FETCH,
  FETCH_LOTTOS,
  FETCH_RAFFLES
} from '../actions/fetchApiActions';

const initialState = {
  lottos: [],
  isLoading: true,
  raffle: {}
}

export function fetcApiReducer( state = initialState, action ) {
  let newState;
  switch( action.type ) {
  case PRE_FETCH:
    newState = {
      isLoading: action.isFetching
    }
    return Object.assign({}, state.isLoading, newState );
  case FETCH_LOTTOS:
    newState = {
      lottos: action.json,
      isLoading: action.isFetching
    };
    return Object.assign({}, state, newState );
  case FETCH_RAFFLES:
    newState = {
      raffle: action.json,
      isLoading: action.isFetching
    };
    return Object.assign({}, state, newState );
  default:
    return state;
  }
}