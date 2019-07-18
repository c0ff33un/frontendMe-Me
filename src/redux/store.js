import { createStore, applyMiddleware } from "redux";
import thunkMiddleWare from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from "./reducers";

//const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleWare)
    //applyMiddleware(thunkMiddleWare, loggerMiddleware)
  )
}
