import { SET_POST } from '../actionTypes'

export default function post(state = null, action) {
  switch(action) {
    case SET_POST:
      const { index } = action.payload
      return index
    default:
      return state
  }
}