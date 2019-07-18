import { combineReducers } from 'redux';
import session from './session'
import { memes, memesByFilter, selectedFilter }  from './memes'

export default combineReducers({ session/*, memes, memesByFilter, selectedFilter */});