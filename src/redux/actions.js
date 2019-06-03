import { 
  LOGIN, 
  LOGOUT, 
  SET_MEME_FILTER,
  SET_UPLOAD_MEME,
  UPLOADING_MEME 
} from './actionTypes'
/*
 * action creators
 */

export function addLogin(jwt) {
  return { type: LOGIN, payload: { jwt } }
}

export function addLogout() {
  return { type: LOGOUT }
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
