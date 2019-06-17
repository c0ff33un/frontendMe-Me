/*
 * action types
 */

export const SET_UPLOAD_MEME = 'SET_UPLOAD_MEME'
export const TOGGLE_UPLOADING_MEME = 'UPLOADING_MEME'
export const SET_MEMES = 'SET_MEMES'

export const FETCH_MEMES = 'REQUEST_MEMES'
export const SET_MEME_FILTER = 'SET_MEME_FILTER'
export const INVALIDATE_MEMES = 'INVALIDATE_MEMES'
export const REQUEST_MEMES = 'REQUEST_MEMES'
export const RECEIVE_MEMES = 'RECEIVE_MEMES'
export const RECEIVE_MEMES_ERROR = 'RECEIVE_MEMES_ERROR'
export const INCREASE_MEMES_PAGE = 'INCREASE_MEMES_PAGE'

export const REQUEST_JWT = 'REQUEST_JWT'
export const RECEIVE_JWT = 'RECEIVE_JWT'
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL'
export const RECEIVE_JWT_ERROR = 'RECEIVE_JWT_ERROR'
export const LOGOUT = 'LOGOUT'

/*
 * other constants
 */

export const MEME_FILTERS = {
  NEW: 'newest',
  HOT: 'hot',
  BEST: 'best',
  RANGE: 'RANGE'
}
