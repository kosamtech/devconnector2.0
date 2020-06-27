import axios from 'axios';
import * as actionTypes from './actionTypes';
import { returnErrors } from './alerts';
import { createMessage } from './messages';

export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.POST_START });

    const res = await axios.get('/api/posts');

    dispatch({
      type: actionTypes.GET_POSTS,
      payload: res.data
    });

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}

export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: {postId, likes: res.data}
    });

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}

export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: {postId, likes: res.data}
    });

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}


export const deletePost = postId => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: actionTypes.DELETE_POST,
      payload: postId
    });

    dispatch(createMessage({postDeleted: res.data.msg}));

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}


export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const data = JSON.stringify(formData);

  try {
    const res = await axios.post('/api/posts', data, config);

    dispatch({
      type: actionTypes.ADD_POST,
      payload: res.data
    });

    dispatch(createMessage({ postAdded: 'Post added' }));
    
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}

export const getPost = postId => async dispatch => {
  try {
    dispatch({ type: actionTypes.POST_START
     });

     const res = await axios.get(`/api/posts/${postId}`);

     dispatch({
       type: actionTypes.GET_POST,
       payload: res.data
     });

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}

export const addComment = (formData, postId) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const data = JSON.stringify(formData);

  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, data, config);

    dispatch({
      type: actionTypes.ADD_COMMENT,
      payload: res.data
    });

    dispatch(createMessage({ commentAdded: 'Comment Added' }));

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: actionTypes.REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(createMessage({ commentDeleted: 'Comment Deleted' }));

  } catch (err) {
    // dispatch(returnErrors(err.response.data, err.response.status));
    console.log(err);
    console.log('it crashed after deleting...');
  }
}