/*
 * action types
 */

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_MEME_FILTER = 'SET_MEME_FILTER'
/*
 * other constants
 */

export const MemeFilters = {
  NEW: 'NEW',
  HOT: 'HOT',
  BEST: 'BEST',
  RANGE: 'RANGE'
}

/*
 * action creators
 */

export function addLogin(email, password) {
  return { type: LOGIN, email, password }
}

export function addLogout(email) {
  return { type: LOGOUT, email }
}

export function setMemeFilter(filter) {
  return { type: SET_MEME_FILTER, filter}
}
 