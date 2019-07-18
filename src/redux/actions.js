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
  LOGOUT,
  SET_FINISHED,
  RECEIVE_MEME
} from './actionTypes'
import getEnvVars from 'me-me/environment'
import { batch } from 'react-redux'

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

export function requestMeme(id){
  return { type: REQUEST_MEME, paylod: {id}}
}

function receiveMemesError() {
  return { type: RECEIVE_MEMES_ERROR }
}

export function receiveMemes(json) {
  return { type: RECEIVE_MEMES, payload: {json} }
}

export function receiveMeme(json){
  return {type: RECEIVE_MEME, payload: {json}}
}

export function receiveFilteredMemes(filter, ids) {
  return { type: RECEIVE_FILTERED_MEMES, 
    payload: {
      filter,
      ids,
      receivedAt: Date.now()
    }
  }
}

export function increaseMemesPage(filter) {
  return {type: INCREASE_MEMES_PAGE, payload: {filter} }
}

function receiveComments(filter, json) {
  return { type: RECEIVE_MEMES, 
    payload: {
      filter,
      comments: json.map(response => { return response.thumbnail }),
      receivedAt: Date.now()
    } 
  }
}

export function setFinished(filter) {
  return { type: SET_FINISHED, payload: { filter }}
}

export function fetchMemes(filter) {
  return (dispatch, getState) => {
    
    batch(() => {
      dispatch(requestMemes(filter))
      dispatch(increaseMemesPage(filter))
    }) 

    const { page, allIds } = getState().memesByFilter[filter]
    const { apiUrl } = getEnvVars
    console.log('fetchMemesPage:' + page)
    console.log('total by now' + allIds.length)
    const size = 18
    const url = `${apiUrl}/memes/${filter}?page=${page-1}&per_page=${size}`


    
    return fetch(url)
    .then(response => response.json())
    .then(json => {
      ids = json.map(meme =>  meme.id)
      finished = ids.length === 0

      batch(() => {
        dispatch(receiveMemes(json))
        dispatch(receiveFilteredMemes(filter, ids))

        if (finished)
          dispatch(setFinished(filter))

      }) 
      
      console.log('results')
      const { page, allIds } = getState().memesByFilter[filter]
      const { apiUrl } = getEnvVars
      console.log('fetchMemesPage:' + page)
      console.log('total by now' + allIds.length)
      console.log('Finished loading images')
      return json
    })
    .catch( error => {
      console.log('Infinite Scroll error', error)
      dispatch(receiveMemesError(filter))
      return error;
    });
  }
}

export function setMeme(id){
  batch(dispatch(requestMeme(id)))
}

export function fetchMeme() {
  return (dispatch, getState) => {
    const { apiUrl } = getEnvVars
    const url = `${apiUrl}/memes/${getState().cur_id}`
    
    return fetch(url)
    .then(response => response.json())
    .then(json => {
      batch(() => {
        dispatch(receiveMeme(json))
      }) 

      console.log('Finished fetching meme')
      return json
    })
    .catch( error => {
      console.log('Problem fetching meme', error)
      return error;
    });
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
          dispatch(receiveJWTError("waat"))
        } else if (status == 201) {
          const jwt = response.headers.map.authorization
          dispatch(receiveJWT(jwt))
        } else {
          dispatch(receiveJWTError("niggaa"))
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

export function fetchComments(id) {
  return (dispatch, getState) => {
    dispatch(requestComments(id))
    const { page } = getState().commentsById[id]
    const { apiUrl } = getEnvVars
    const url = `${apiUrl}/memes/${id}/comments`
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


// export function selectPostMeme(uri) {
//   return (dispatch, getState) => {
//     dispatch(setPostMeme(uri))
//     const { page } = getState().memesByFilter[filter]
//     const { apiUrl } = getEnvVars
//     const url = `${apiUrl}/memes/${filter}?page=${page}&per_page=${size}`
//     dispatch(increaseMemesPage(filter))
//     return fetch(url)
//       .then(response => response.json())
//       .then(json => {
//         id = json.map(meme => {return meme.id})
//         dispatch(increaseMemesPage(filter))
//         dispatch(receiveMemes(json))
//         dispatch(receiveFilteredMemes(filter, ids))
//         dispatch(receivePostMeme(id))
//         return json
//       })
//       .catch(error => {
//         console.log("fetchMemes error")
//         console.log(error)
//         dispatch(receiveMemesError())
//         return error;
//       })
//   }
// }