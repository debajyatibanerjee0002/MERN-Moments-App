import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// const initialState = {
//   posts: [],
// };

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPosts(state, action) {
      return action.payload;
    },
    createPost(state, action) {
      state.push(action.payload);
    },
    updatePost(state, action) {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    deletePost(state, action) {
      return state.filter((post) => post._id !== action.payload);
    },
    updateLikePost(state, action) {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
  },
});

export default postsSlice.reducer;
export const postsActions = postsSlice.actions;
