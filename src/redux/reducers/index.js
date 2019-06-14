import { combineReducers } from 'redux';
import session from './session'
import memeFilter from './memeFilter'

export default combineReducers({ session, memeFilter });