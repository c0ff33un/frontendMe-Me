import {
  LOGIN,
  LOGOUT
} from '../actionTypes'

const initialState = null


function session(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload.jwt;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

export default session;
