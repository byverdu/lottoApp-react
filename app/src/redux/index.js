import { combineReducers } from 'redux'
import { fetcApiReducer } from './reducers/fetchApi';

const rootReducer = combineReducers({
  api: fetcApiReducer
})

export default rootReducer