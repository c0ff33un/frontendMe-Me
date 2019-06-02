import { combineReducers } from 'redux'
import {
  LOGIN,
  LOGOUT,
  SET_MEME_FILTER,
  MemeFilters
} from './actions'

const { HOT } = MemeFilters

const initialState = {
  memeFilter: MemeFilters.HOT,
  jwt: null
}

function memeFilter(state = HOT, action) {
  switch (action.type) {
    case SET_MEME_FILTER:
      return action.filter
    default:
      return state
  }
}

function jwt(state = null, action) {
  switch (action.type) {
    case LOGIN:
      //todo
    case LOGOUT:
      return null
    default:
      return state
  }
}


const memeApp = combineReducers({
  memeFilter,
  jwt
})

export default memeApp