import { createStore } from "redux";
import sessions from "./reducers/sessions";

const store = createStore(sessions, {});

export default store;
