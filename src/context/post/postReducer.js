import {
  ADD_POST,
  ADD_POST_ERROR,
  CLEAR_ADD_POST_ERROR,
  SET_ADD_POST_LOADING,
  CLEAR_ADD_POST_LOADING,
  CLEAR_ERRORS,
  CLEAR_LOADING,
  POSTS_ERROR,
  SET_LOADING,
  SET_POSTS,
  LIKE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../types";

const postReducer = (state, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id == action.payload.postId) {
            post.likes = action.payload.likes;
          }
          return post;
        }),
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id == action.payload.postId) {
            post.comments.push(action.payload.comment);
          }
          return post;
        }),
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if(post._id == action.payload.postId){
            post.comments = post.comments.filter(comment => comment._id!= action.payload.commentId)
          }
          return post;
        })
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case ADD_POST_ERROR:
      return {
        ...state,
        errorAddPostForm: action.payload,
      };
    case CLEAR_ADD_POST_ERROR:
      return {
        ...state,
        errorAddPostForm: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_ADD_POST_LOADING:
      return {
        ...state,
        loadingAddPostForm: true,
      };
    case CLEAR_ADD_POST_LOADING:
      return {
        ...state,
        loadingAddPostForm: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
