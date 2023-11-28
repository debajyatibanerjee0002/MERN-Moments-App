import { postsActions } from "../reducers/posts";

import * as api from "../../api";

export const getPostAsync = (id) => {
  return async (dispatch) => {
    try {
      dispatch(postsActions.startLoading());
      const { data } = await api.fetchPost(id);
      // console.log("From getPostAsync --> ", data);
      dispatch(postsActions.fetchPost(data));
      dispatch(postsActions.endLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostsAsync = (page) => {
  return async (dispatch) => {
    try {
      dispatch(postsActions.startLoading());
      const { data } = await api.fetchPosts(page);
      // console.log("From getPostAsync --> ", data);
      dispatch(postsActions.fetchPosts(data));
      dispatch(postsActions.endLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostBySearchAsync = (searchQuery) => async (dispatch) => {
  try {
    dispatch(postsActions.startLoading());
    const { data } = await api.fetchPostBySearch(searchQuery);
    console.log(data);
    dispatch(postsActions.fetchPostsBySearch(data));
    dispatch(postsActions.endLoading());
  } catch (error) {
    console.log(error);
  }
};

export const createPostAsync = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    // console.log("Inside createPostAsync --> ", data);
    navigate(`/posts/${data._id}`);
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

    // console.log("updateLikePostAsync --> ", data);

    dispatch(postsActions.updateLikePost(data));
  } catch (error) {
    console.log(error);
  }
};

export const commentPostAsync = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch(postsActions.comment(data));

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
