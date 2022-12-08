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

} from "../types";
import PostContext from "./postContext";
import postReducer from "./postReducer";

const PostState = (props) => {
  const initialState = {
    posts: [],
    error: null,
    loading: false,
    errorAddPostForm: null,
    loadingAddPostForm: false
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

  const addPost = async (postContent) => {
    const { file } = postContent;
    try {
      if (file) {
        const uploadUrl =
          file.type === "video/mp4"
            ? "https://api.cloudinary.com/v1_1/dn6etipht/video/upload"
            : "https://api.cloudinary.com/v1_1/dn6etipht/image/upload";

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "SocialMedia");

        setAddPostLoading()

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
      clearAddPostLoading()

    } catch (error) {
      dispatch({ type: ADD_POST_ERROR, payload: error?.response?.data?.message });
    }
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  const clearAddPostError = () =>{
    dispatch({type: CLEAR_ADD_POST_ERROR});
  }

  // set add post loading
  const setAddPostLoading = () =>{
    dispatch({type: SET_ADD_POST_LOADING})
  } 

  const clearAddPostLoading = () =>{
    dispatch({type: CLEAR_ADD_POST_LOADING})
  } 

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
        clearError,
        addPost,
        setLoading,
        clearLoading,
        clearAddPostError,
        setAddPostLoading,
        clearAddPostLoading
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
