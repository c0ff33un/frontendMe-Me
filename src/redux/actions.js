import {  
  SET_MEMES,
  SET_UPLOAD_MEME,
  UPLOADING_MEME,
  SET_MEME_FILTER,
  MEME_FILTERS,
  REQUEST_MEMES,
  INVALIDATE_MEMES,
  RECEIVE_MEMES,
  RECEIVE_FILTERED_MEMES,
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

function receiveMemesError() {
  return { type: RECEIVE_MEMES_ERROR }
}

function receiveMemes(json) {
  return { type: RECEIVE_MEMES, payload: {json} }
}

function receiveFilteredMemes(filter, ids) {
  return { type: RECEIVE_FILTERED_MEMES, 
    payload: {
      filter,
      ids,
      receivedAt: Date.now()
    }
  }
}

function increaseMemesPage(filter) {
  return {type: INCREASE_MEMES_PAGE, payload: {filter} }
}

export function fetchMemes(filter, size) {
  return (dispatch, getState) => {
    dispatch(requestMemes(filter))
    const { page } = getState().memesByFilter[filter]
    const { apiUrl } = getEnvVars
    const url = `${apiUrl}/memes/${filter}?page=${page}&per_page=${size}`
    dispatch(increaseMemesPage(filter))
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        ids = json.map(meme => {return meme.id})
        dispatch(increaseMemesPage(filter))
        dispatch(receiveMemes(json))
        dispatch(receiveFilteredMemes(filter, ids))
        return json
      })
      .catch(error => {
        console.log("fetchMemes error")
        console.log(error)
        dispatch(receiveMemesError())
        return error;
      })
  }
}

export 

function requestJWT() {
  return { type: REQUEST_JWT }
}

function validateEmail() {
  return { type: VALIDATE_EMAIL }
}

function receiveJWT(jwt) {
  return { type: RECEIVE_JWT, payload: { jwt } }
}

function receiveJWTError(message) {
  return { type: RECEIVE_JWT_ERROR, payload: {message} }
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
    return fetch(apiUrl + '/login', options)
      .then(response => {
        const { status } = response
        if(status == 401) {
          return response.json()
        } else if (status == 201) {
          const jwt = response.headers.map.authorization
          dispatch(receiveJWT(jwt))
        } else {
          dispatch(receiveJWTError("monda"))
        }
        return response
      })
      .then(json => {
        console.log("##################")
        console.log(json)
        dispatch(receiveJWTError("waat"))
        return json
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