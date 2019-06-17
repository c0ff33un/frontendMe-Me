import { createStore } from 'redux'
import memeAppReducer from './reducers'
const store = createStore(memeAppReducer)

import {
  addLogin,
  addLogout,
  SET_MEME_FILTER,
  setUploadMeme,
  TOGGLE_UPLOADING_MEME,
  MemeFilters
} from './actions'



