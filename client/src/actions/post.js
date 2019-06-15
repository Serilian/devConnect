import axios from "axios";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES
} from "./actionTypes";
import { setAlert } from "./alert";

export const getPosts = () => async dispatch => {

  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => (dispatch(setAlert(error.msg, "danger"))));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }


};

export const addLike = (id) => async dispatch => {
  try {
    const res = await axios.put(`api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { likes: res.data, id }
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.statusText, status: err.response.status }
    });
  }
};

export const removeLike = (id) => async dispatch => {
  try {
    const res = await axios.put(`api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { likes: res.data, id }
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.statusText, status: err.response.status }
    });
  }
};
export const deletePost = (id) => async dispatch => {
  try {
    await axios.delete(`api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: { id }
    });

    dispatch(setAlert("Post removed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(setAlert(err.response.data.msg, "danger"));

      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.data.statusText, status: err.response.status }
      });
    }
  }
};

export const addPost = (text) => async dispatch => {
  try {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const formData = {
      text
    };

    const res = await axios.post(`api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => (dispatch(setAlert(error.msg, "danger"))));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPost = (id) => async dispatch => {

  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.statusText, status: err.response.status }
    });
  }
};

export const addComment = (id, data) => async dispatch => {
  try {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const formData = {
      text: data
    };

    const res = await axios.post(`/api/posts/comment/${id}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Comment added", "success"));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.statusText, status: err.response.status }
    });
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {

    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
    dispatch(setAlert("Comment Removed", "success"));

  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.statusText, status: err.response.status }
    });
  }
};

