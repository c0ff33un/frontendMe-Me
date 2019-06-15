import { MEME_FILTERS } from './actionTypes'

export const getMemesState = store => store.memesByFilter 

export const getMemesList = store => {
//  getMemesState(store)? get
}

export const getMemes = store => {
}

export const getMemesByFilter = (store, filter, page) => {
  return memesByFilter[
    selectedFilter
  ] || {
    isFetching: true,
    items: []
  }
  
}