import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { useContext, useReducer } from "react";
import alertContext from "../alert/alertContext";
import {
  ADD_POST,
  ADD_POST_ERROR,
  CLEAR_ADD_POST_ERROR,
  CLEAR_ERRORS,
  CLEAR_LOADING,
  POSTS_ERROR,
  SET_LOADING,
  SET_POSTS,
  SET_ADD_POST_LOADING,
  CLEAR_ADD_POST_LOADING,
  LIKE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_POSTS,
} from "../types";
import PostContext from "./postContext";
import postReducer from "./postReducer";

const PostState = (props) => {
  const initialState = {
    posts: [],
    error: null,
    loading: false,
    errorAddPostForm: null,
    loadingAddPostForm: false,
  };
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { setAlert } = useContext(alertContext);

  const getPosts = async () => {
    try {
      const res = await axios.get("/post/all");
      dispatch({ type: SET_POSTS, payload: res.data.posts });
    } catch (error) {
      dispatch({ type: POSTS_ERROR, payload: error.response.data.message });
    }
  };

  const clearPosts = () =>{
    dispatch({type: CLEAR_POSTS})
  }

  const addPost = async (postContent) => {
    const { file } = postContent;
    try {
      setAddPostLoading();
      if (file) {
        const uploadUrl =
          file.type === "video/mp4"
            ? "https://api.cloudinary.com/v1_1/dn6etipht/video/upload"
            : "https://api.cloudinary.com/v1_1/dn6etipht/image/upload";

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "SocialMedia");

        const res = await fetch(uploadUrl, {
          method: "POST",
          body: data,
        });

        const media = await res.json();
        postContent.mediaUrl = media.url;
        postContent.mediaType = media.resource_type;
      }

      const res = await axios.post("/post", postContent);
      dispatch({ type: ADD_POST, payload: res.data?.post });

      setAlert(res.data.message, "success");
      clearAddPostLoading();
    } catch (error) {
      dispatch({
        type: ADD_POST_ERROR,
        payload: error?.response?.data?.message,
      });
      
      clearAddPostLoading();
    }
  };

  const likePost = async (postId) => {
    try {
      const res = await axios.get(`/post/like/${postId}`);
      dispatch({ type: LIKE_POST, payload: { likes: res.data.likes, postId } });
    } catch (error) {
      dispatch({ type: POSTS_ERROR, payload: error.response.data.message });
    }
  };

  const addComment = async(postId, comment) =>{
    try {
      const res = await axios.post(`/post/comment/${postId}`,{
        text: comment
      });
      dispatch({ type: ADD_COMMENT, payload: { postId, comment: res.data.comment  } });
      setAlert(res.data.message, 'success');
    } catch (error) {
      dispatch({ type: POSTS_ERROR, payload: error.response.data.message });
      setAlert(error.response.data.message, 'danger');
    }
  }

  const removeComment = async(postId, commentId) =>{
    try {
      const res = await axios.delete(`/post/comment/${postId}/${commentId}`)
      dispatch({type: REMOVE_COMMENT, payload: {postId, commentId}})
      setAlert(res.data.message, 'success')
    } catch (error) {
      dispatch({type: POSTS_ERROR, payload: error.response.data.message})
      setAlert(error.response.data.message, 'danger');
    }
  }

  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  const clearAddPostError = () => {
    dispatch({ type: CLEAR_ADD_POST_ERROR });
  };

  // set add post loading
  const setAddPostLoading = () => {
    dispatch({ type: SET_ADD_POST_LOADING });
  };

  const clearAddPostLoading = () => {
    dispatch({ type: CLEAR_ADD_POST_LOADING });
  };

  //set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  //clear loading
  const clearLoading = () => {
    dispatch({ type: CLEAR_LOADING });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        errorAddPostForm: state.errorAddPostForm,
        loading: state.loading,
        loadingAddPostForm: state.loadingAddPostForm,
        getPosts,
        clearPosts,
        clearError,
        addPost,
        setLoading,
        clearLoading,
        clearAddPostError,
        setAddPostLoading,
        clearAddPostLoading,
        likePost,
        addComment,
        removeComment
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
