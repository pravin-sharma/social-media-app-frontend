import axios from "axios";
import React, { useContext, useReducer } from "react";
import { ADD_POST, CLEAR_ERRORS, POSTS_ERROR, SET_LOADING, SET_POSTS } from "../types";
import PostContext from "./postContext";
import postReducer from "./postReducer";

const PostState = (props) => {
  const initialState = {
    posts: [],
    error: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(postReducer, initialState);

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
    console.log(file)
    try {
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
    } catch (error) {
      dispatch({ type: POSTS_ERROR, payload: error.response.data.message });
    }
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

   //set loading
   const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        loading: state.loading,
        getPosts,
        clearError,
        addPost,
        setLoading
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
