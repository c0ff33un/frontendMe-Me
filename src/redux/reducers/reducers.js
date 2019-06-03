import { combineReducers } from 'redux'
import {
  LOGIN,
  LOGOUT,
  SET_MEME_FILTER,
  SET_UPLOAD_MEME,
  TOGGLE_UPLOADING_MEME,
  MemeFilters
} from './actions'

const { HOT } = MemeFilters;


// not used only used as reference of what initial state should be and what function should look like
const initialState = {
  memeFilter: MemeFilters.HOT,
  jwt: null,
  uploadScreenImage: null,
  uploadingMeme: false
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
      const { jwt } = action.payload;
      return 
      //todo
    case LOGOUT:
      return null
    default:
      return state
  }
}

function uploadScreenImage(state = null, action) {
  switch (action.type) {
    case SET_UPLOAD_MEME:
      return state.image
    default:
      return state
  }
}

function uploadingMeme(state = false, action) {
  switch (action.type) {
    case TOGGLE_UPLOADING_MEME:
      return !state
    default:
      return state
  }
}


const memeAppReducer = combineReducers({
  memeFilter,
  jwt,
  uploadScreenImage,
  uploadingMeme,
})

export default memeAppReducer;