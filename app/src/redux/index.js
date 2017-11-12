import { combineReducers } from 'redux'
import { fetcApiReducer } from './reducers/fetchApiReducers';
import { savedRaffleReducer } from './reducers/savedRaffleReducers';

const rootReducer = combineReducers({
  api: fetcApiReducer,
  savedRaffle: savedRaffleReducer
})

export default rootReducer