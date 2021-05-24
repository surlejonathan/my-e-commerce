import { createStore, combineReducers } from "redux";

import userReducer from "./User/user.reducer";

const reducers = combineReducers({ user: userReducer });

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
