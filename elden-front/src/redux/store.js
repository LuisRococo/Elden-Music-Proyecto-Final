import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player/playerReducer";

export const rootReduxer = combineReducers({
  player: playerReducer
});

export default configureStore({
  reducer: rootReduxer
});
