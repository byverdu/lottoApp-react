import { combineReducers } from 'redux'
import { fetcApiReducer } from './reducers/fetchApiReducers';

const rootReducer = combineReducers({
  api: fetcApiReducer
})

export default rootReducer