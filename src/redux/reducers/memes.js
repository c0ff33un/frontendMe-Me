import {
  SET_MEME_FILTER,
  SET_MEMES,
  MEME_FILTERS,
  INVALIDATE_MEMES,
  REQUEST_MEMES,
  RECEIVE_MEMES,
  RECEIVE_FILTERED_MEMES,
  RECEIVE_MEMES_ERROR,
  INCREASE_MEMES_PAGE
} from "../actionTypes";

const initialState = { memeFilter: "best" };

function memes_(
  state = {
    isFetching: false,
    isRefreshing: false,
    didInvalidate: false,
    page: 1,
    allIds: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_MEMES:
      return Object.assign({}, state, {
        didInvalidate: true,
        isRefreshing: true,
        page: 1,
        allIds: []
      });
    case REQUEST_MEMES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_FILTERED_MEMES:
      const { ids, receivedAt } = action.payload;
      return Object.assign({}, state, {
        isFetching: false,
        isRefreshing: false,
        didInvalidate: false,
        allIds: [...state.allIds, ...ids],
        lastUpdated: receivedAt
      });
    case RECEIVE_MEMES_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isRefreshing: false
      });
    case INCREASE_MEMES_PAGE:
      return Object.assign({}, state, {
        page: state.page + 1
      });
    default:
      return state;
  }
}

export function memesByFilter(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_MEMES:
    case RECEIVE_FILTERED_MEMES:
    case INCREASE_MEMES_PAGE:
    case REQUEST_MEMES:
      const { filter } = action.payload;
      return Object.assign({}, state, {
        [filter]: memes_(state[filter], action)
      });
    default:
      return state;
  }
}

export function commentsById(state = {}, action) {
    switch (action.type) {
    case INVALIDATE_MEMES:
    case RECEIVE_FILTERED_MEMES:
    case INCREASE_MEMES_PAGE:
    case REQUEST_MEMES:
      const { id } = action.payload;
      return Object.assign({}, state, {
        [id]: memes_(state[filter], action)
      });
    default:
      return state;
  }
}

export function selectedFilter(state = "best", action) {
  switch (action.type) {
    case SET_MEME_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
}

export function memes(state = {
  allIds: [],
  byIds: {}
}, action) {
  switch (action.type) {
    case RECEIVE_MEMES:
      const { json } = action.payload
      let { allIds, byIds } = state
      console.log('##################')
      console.log(json)
      for (key in Object.keys(json)) {
        meme = json[key]
        console.log('@@@@@@@@')
        console.log(Object.keys(meme))
        if ( state.byIds[meme] ) {
          byIds[meme.id] = meme.thumbnail
        } else {
          allIds.push(meme.id)
          byIds[meme.id] = meme.thumbnail
        }
      }
      return Object.assign({}, state, {
        allIds, byIds
      })
    default:
      return state;
  }
}
