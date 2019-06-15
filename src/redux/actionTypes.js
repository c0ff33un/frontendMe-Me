/*
 * action types
 */

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_UPLOAD_MEME = 'SET_UPLOAD_MEME'
export const TOGGLE_UPLOADING_MEME = 'UPLOADING_MEME'
export const SET_MEMES = 'SET_MEMES'
export const FETCH_MEMES = 'REQUEST_MEMES'
export const SET_MEME_FILTER = 'SET_MEME_FILTER'
export const INVALIDATE_MEMES = 'INVALIDATE_MEMES'
export const REQUEST_MEMES = 'REQUEST_MEMES'
export const RECEIVE_MEMES = 'RECEIVE_MEMES'
export const INCREASE_MEMES_PAGE = 'INCREASE_MEMES_PAGE'

/*
 * other constants
 */

export const MEME_FILTERS = {
  NEW: 'newest',
  HOT: 'hot',
  BEST: 'best',
  RANGE: 'RANGE'
}
