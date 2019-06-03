import { createStore } from "redux";
import { addLogin } from './actions'
import rootReducer from "./reducers";

export default createStore(rootReducer);
