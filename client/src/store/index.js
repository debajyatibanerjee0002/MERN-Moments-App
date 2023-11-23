import { configureStore } from "@reduxjs/toolkit";

import postsReducers from "./reducers/posts";

const store = configureStore({
  reducer: {
    posts: postsReducers,
  },
});

export default store;
