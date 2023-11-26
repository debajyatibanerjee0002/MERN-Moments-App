import { postsActions } from "../reducers/posts";

import * as api from "../../api";

export const getPostsAsync = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
      // console.log("From getPostAsync --> ", data);
      dispatch(postsActions.fetchPosts(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createPostAsync = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    console.log("Inside createPostAsync --> ", data);
    dispatch(postsActions.createPost(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePostAsync = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    // console.log("updatePostAsync --> ", data);
    dispatch(postsActions.updatePost(data));
  } catch (error) {
    console.log(error);
  }
};

export const deletePostAsync = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch(postsActions.deletePost(id));
  } catch (error) {
    console.log(error);
  }
};

export const updateLikePostAsync = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateLikePost(id);

    console.log("updateLikePostAsync --> ", data);

    dispatch(postsActions.updateLikePost(data));
  } catch (error) {
    console.log(error);
  }
};
