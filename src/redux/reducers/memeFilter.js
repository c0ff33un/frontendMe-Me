import { SET_MEME_FILTER } from '../actionTypes'

const initialState = 'best'

function memeFilter(state = initialState, action) {
  switch(action.type) { 
    case SET_MEME_FILTER:
      return action.payload.filter
    default:
      return state
  }
}

export default memeFilter