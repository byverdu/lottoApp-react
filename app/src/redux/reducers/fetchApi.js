import {
  PRE_FETCH,
  RESPONSE_FROM_API
} from '../actions/fetchApi';

const initialState = {
  data: [],
  isLoading: true
}

export function fetcApiReducer( state = initialState, action ) {
  let newState;
  switch( action.type ) {
  case PRE_FETCH:
    newState = {
      isLoading: action.isFetching
    }
    return Object.assign({}, state.isLoading, newState );
  case RESPONSE_FROM_API:
    newState = {
      data: action.json,
      isLoading: action.isFetching
    };
    return Object.assign({}, state, newState );
  default:
    return state;
  }
}