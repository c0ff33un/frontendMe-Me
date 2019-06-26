import {  
  SET_MEMES,
  SET_UPLOAD_MEME,
  UPLOADING_MEME,
  SET_MEME_FILTER,
  MEME_FILTERS,
  REQUEST_MEMES,
  INVALIDATE_MEMES,
  RECEIVE_MEMES,
  RECEIVE_MEMES_ERROR,
  INCREASE_MEMES_PAGE,
  REQUEST_JWT,
  RECEIVE_JWT,
  VALIDATE_EMAIL,
  RECEIVE_JWT_ERROR,
  LOGOUT
} from './actionTypes'
import getEnvVars from 'me-me/environment'

/*
 * action creators
 */

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

function receiveMemes(filter, json) {
  return { type: RECEIVE_MEMES, 
    payload: {
      filter,
      memes: json.map(response => { return response.img }),
      receivedAt: Date.now()
    } 
  }
}

function receiveMemesError() {
  return { type: RECEIVE_MEMES_ERROR }
}

function fetchMemes(filter, page) {
  return dispatch => {
    dispatch(requestMemes(filter))
    const size = 8
    const { apiUrl } = getEnvVars
    const url = `${apiUrl}/memes/${filter}?page=${page}&per_page=${size}`
    console.log(url)
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveMemes(filter, json)))
      .catch(error => {
        console.log("fetchMemes error")
        console.log(error)
        dispatch(receiveMemesError())
        return error;
      })
  }
}

function shouldFetchMemes(state) {
  if( !state ) return true
  const { items, page } = state
  const length = items.length
  if ( length ==  (page - 1) * 8 ) {
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
      let page = state ? state.page : 1;
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

function requestJWT() {
  return { type: REQUEST_JWT }
}

function validateEmail() {
  return { type: VALIDATE_EMAIL }
}

function receiveJWT(jwt) {
  return { type: RECEIVE_JWT, payload: { jwt } }
}

function receiveJWTError() {
  return { type: RECEIVE_JWT_ERROR }
}

export function loginWithJWT(jwt){
  return (dispatch) => {
    if(jwt) return dispatch(receiveJWT(jwt))
    else return dispatch(receiveJWTError())
  }
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(requestJWT())
    const { apiUrl } = getEnvVars
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      })
    }
    // console.log('actions.js')
    // console.log(email, password)
    // console.log(options)
    // console.log(apiUrl)
    return fetch(apiUrl + '/login', options)
      .then(response => {
        const { status } = response
        // console.log(response)
        if(status == 401) {
          dispatch(validateEmail())
        } else if (status == 201) {
          const jwt = response.headers.map.authorization
          dispatch(receiveJWT(jwt))
        }
        return response
      })
      .catch(error => {
        console.log(error)
        dispatch(receiveJWTError())
        return error
      })
  }
}

export function logout() {
  return { type: LOGOUT }
}