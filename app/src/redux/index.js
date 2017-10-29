export const CHANGE_COLOR = 'CHANGE_COLOR';

export function changeColorAction( color ) {
  return {
    type: 'CHANGE_COLOR',
    color
  }
}

const initialState = {
  color: 'green'
};

export function changeColorReducer ( state = initialState, action ) {
  switch ( action.type ) {
  case CHANGE_COLOR:
    return Object.assign({}, state, {color: action.color});
  default:
    return state;
  }
}
