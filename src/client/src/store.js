import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import allReducers from "./redux/reducers";

const logger = store => next => action => {
  console.log('dispatching', action)
  
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export const store = configureStore({
  reducer: allReducers,
  middleware: [thunkMiddleware, /* logger */],
  preloadedState: {}
});