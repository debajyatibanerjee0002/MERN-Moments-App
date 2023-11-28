import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    startLoading(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    endLoading(state, action) {
      return {
        ...state,
        isLoading: false,
      };
    },
    fetchPosts(state, action) {
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    },
    fetchPost(state, action) {
      return {
        ...state,
        post: action.payload,
      };
    },
    fetchPostsBySearch(state, action) {
      return {
        ...state,
        posts: action.payload,
      };
    },
    createPost(state, action) {
      return { ...state, posts: state.posts.push(action.payload) };
    },
    updatePost(state, action) {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    },
    deletePost(state, action) {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    },
    updateLikePost(state, action) {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    },
    comment(state, action) {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    },
  },
});

export default postsSlice.reducer;
export const postsActions = postsSlice.actions;
