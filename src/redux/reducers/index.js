import { combineReducers } from 'redux';
import session from './session'
import { memes, memesByFilter, selectedFilter, memePostId }  from './memes'

export default combineReducers(
  { session,
    memes,
    memePostId,
    memesByFilter, 
    selectedFilter});