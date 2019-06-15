import { 
  LOGIN, 
  LOGOUT, 
  SET_MEMES,
  SET_UPLOAD_MEME,
  UPLOADING_MEME,
  SET_MEME_FILTER,
  MEME_FILTERS,
  REQUEST_MEMES,
  INVALIDATE_MEMES,
  RECEIVE_MEMES,
  INCREASE_MEMES_PAGE
} from './actionTypes'
/*
 * action creators
 */

export function login(jwt) {
  return { type: LOGIN, payload: { jwt } }
}

export function logout() {
  return { type: LOGOUT }
}

export function setUploadMeme(image) {
  return { type: SET_UPLOAD_MEME, image }
}

export function toggleUploadingMeme() {
  return { type: UPLOADING_MEME }
}

export function setMemeFilter(filter) {
  return { type: SET_MEME_FILTER, payload: {filter} }
}

export function invalidateMemes(filter) {
  return { type: INVALIDATE_MEMES, payload: {filter} }
}

export function requestMemes(filter) {
  return { type: REQUEST_MEMES, payload: {filter} }
}

export function receiveMemes(filter, json) {
  return { type: RECEIVE_MEMES, 
    payload: {
      filter,
      memes: json.map(response => { return response.img }),
      receivedAt: Date.now()
    } 
  }
}

function fetchMemes(filter, page) {
  return dispatch => {
    dispatch(requestMemes(filter))
    const size = 8
    const url = 'https://meemperrapi.herokuapp.com/memes/'+filter+`?page=${page}&per_page=${size}`
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveMemes(filter, json)))
      .catch(error => {
        console.log("fetchMemes error")
        console.log(error)
        return error;
      })
  }
}

function shouldFetchMemes(state) {
  if( !state ) return true
  const { items, page } = state
  const length = items.length
  if ( length <  page * 8 ) {
    return true
  } else if (state.isFetching) {
    return false
  } else {
    return state.didInvalidate
  }
}

export function fetchMemesIfNeeded(filter) {
  return (dispatch, getState) => {
    const state = getState().memesByFilter[filter]
    if ( shouldFetchMemes(state) ) {
      let page
      if( state ) {
        page = state.page
      }else{
        page = 1
      }
      return dispatch(fetchMemes(filter, page))
    }
  }
}

function shouldIncreaseMemesPage(state) {
  if( state ) {
    const { items, page } = state
    const length = items.length
    return length == page * 8
  } else {
    return false
  }
}

export function increaseMemesPageIfNeeded(filter) {
  return (dispatch, getState) => {
    const state = getState().memesByFilter[filter]
    if(shouldIncreaseMemesPage(state)) {
      return dispatch({ type: INCREASE_MEMES_PAGE, payload: { filter } })
    }
  }
}