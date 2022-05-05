import { combineReducers, configureStore } from "@reduxjs/toolkit";
import errorReducer from "./reducers/errorReducer";
import playerReducer from "./reducers/playerReducer";
import tokenReducer from "./reducers/tokenReducer";
import thunkMiddleware from 'redux-thunk'

export const rootReduxer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  error: errorReducer
});

const store = configureStore({
  reducer: rootReduxer,
  middleware: [thunkMiddleware],
});

export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch