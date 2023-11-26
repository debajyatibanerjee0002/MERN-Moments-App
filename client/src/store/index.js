import { configureStore } from "@reduxjs/toolkit";

import postsReducers from "./reducers/posts";
import authReducers from "./reducers/auth";

const store = configureStore({
  reducer: {
    posts: postsReducers,
    auth: authReducers,
  },
});

export default store;
