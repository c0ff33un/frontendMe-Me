import { MEME_FILTERS } from './actionTypes'

export const getMemesState = store => store.memes;

// export const getMemes = store => {
// }

// export const getMemesList = store => {
//   getMemesState(store) ? getMemesState(store).allIds : []
// }



// export const getMemes = store => {
//   getMemesList(store).map(id => getMemeById(store,id))
// }

export const getMemesByIds = (store, ids) => {
  const memesState = getMemesState(store)
  let memes = []
  for (id of ids)
    memes = [...memes, memesState.byIds[id].thumbnail]

  return memes
}

export const getMemeById = (store, id) => 
  getMemesState(store).byIds[id] ? getMemesState(store).byIds[id] : null 