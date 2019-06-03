/*
 * action types
 */

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_MEME_FILTER = 'SET_MEME_FILTER'
export const SET_UPLOAD_MEME = 'SET_UPLOAD_MEME'
export const TOGGLE_UPLOADING_MEME = 'UPLOADING_MEME'

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

export function setUploadMeme(image) {
  return { type: SET_UPLOAD_MEME, image }
}

export function toggleUploadingMeme() {
  return { type: UPLOADING_MEME }
}
