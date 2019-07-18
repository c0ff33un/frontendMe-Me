import {
  SET_MEME_FILTER,
  SET_MEMES,
  SET_MEME,
  MEME_FILTERS,
  INVALIDATE_MEMES,
  REQUEST_MEMES,
  REQUEST_MEME,
  RECEIVE_MEMES,
  RECEIVE_MEME,
  RECEIVE_FILTERED_MEMES,
  RECEIVE_MEMES_ERROR,
  INCREASE_MEMES_PAGE,
  SET_FINISHED
} from "../actionTypes";

const initialState = { memeFilter: "best" };

function memes_(
  state = {
    isFetching: false,
    isRefreshing: false,
    didInvalidate: false,
    finished: false,
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
        finished: false,
        page: 1,
        allIds: []
      });
    case REQUEST_MEMES:
    case REQUEST_MEME:
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
        isRefreshing: false,
        finished: true
      });
    case INCREASE_MEMES_PAGE:
      return Object.assign({}, state, {
        page: state.page + 1
      });
    case SET_FINISHED:
      return Object.assign({}, state, {
        finished: true
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
    case SET_FINISHED:
    case REQUEST_MEMES:
      const { filter } = action.payload;
      return Object.assign({}, state, {
        [filter]: memes_(state[filter], action)
      });
    case REQUEST_MEME:
      const {id} = action.payload;
      return Object.assign({}, state, {
        cur_id: id
      });
    default:
      return state;
  }
}

// export function commentsById(state = {}, action) {
//     switch (action.type) {
//     case INVALIDATE_MEMES:
//     case RECEIVE_FILTERED_MEMES:
//     case INCREASE_MEMES_PAGE:
//     case REQUEST_MEMES:
//       const { id } = action.payload;
//       return Object.assign({}, state, {
//         [id]: memes_(state[filter], action)
//       });
//     default:
//       return state;
//   }
// }

export function selectedFilter(state = "best", action) {
  switch (action.type) {
    case SET_MEME_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
}


export function memePostId(state = null, action) {
  switch (action.type) {
    case SET_MEME:
      return action.payload.id
    default:
      return state
  }
}

export function memes(state = {
  allIds: [],
  byIds: {},
  reactions: {},
  avatar: null,
  handle: "",
}, action) {
  switch (action.type) {
    
    case RECEIVE_MEMES: {
      const { json } = action.payload
      let { byIds, allIds } = state
      for (key in Object.keys(json)) {
        meme = json[key]
        byIds[meme.id] = {}

        if ( state.byIds[meme] ) {
          byIds[meme.id].thumbnail = meme.thumbnail
        } else {
          allIds.push(meme.id)
          byIds[meme.id].thumbnail = meme.thumbnail
        }
      }

      return Object.assign({}, state, {
        allIds, byIds
      })
    }
    case RECEIVE_MEME: {
      const { json } = action.payload
      let { byIds } = state
      
      let meme_stuff = {
        img: json.img,
        handle: json.creator.handle,
        avatar: json.creator.avatar,
        reactions: json.reaction_counts,
        reacted: json.reaction_signed_user,
      }

      byIds[json.id] = Object.assign({}, byIds[json.id], meme_stuff);

      return Object.assign({}, state, {
        byIds
      })
    }
    default: {
      return state;
    }
  }
}
