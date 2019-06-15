import {
  REQUEST_JWT,
  RECEIVE_JWT,
  RECEIVE_JWT_ERROR,
  VALIDATE_EMAIL,
  LOGOUT
} from '../actionTypes'

function session(
  state = {
    jwt: null,
    isLoggingIn: false,
    needsValidation: false
  }, 
  action
) {
  switch (action.type) {
    case REQUEST_JWT:
      return Object.assign({},
        state,
        { isLoggingIn: true })
    case RECEIVE_JWT:
      const { jwt } = action.payload
      return Object.assign({},
        state,
        {jwt, isLoggingIn: false})
    case RECEIVE_JWT_ERROR: 
      return { isLoggingIn: false }
    case VALIDATE_EMAIL:
      return Object.assign({}, 
        state,
        { needsValidation: true, isLoggingIn: false})
    case LOGOUT:
      return { jwt: null, isLoggingIn: false };
    default:
      return state;
  }
}

export default session;
