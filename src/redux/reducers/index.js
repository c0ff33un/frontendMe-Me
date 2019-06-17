import { combineReducers } from 'redux';
import session from './session'
import { memesByFilter, selectedFilter }  from './memes'

export default combineReducers({ session, memesByFilter, selectedFilter });