import React from "react";
import {
  SET_LOGGED_USER_PROFILE,
  CLEAR_LOGGED_USER_PROFILE,
  SET_OTHER_USER_PROFILE,
  CLEAR_OTHER_USER_PROFILE,
  SET_LOGGED_USER_POSTS,
  DELETE_LOGGED_USER_POST,
  CLEAR_LOGGED_USER_POSTS,
  SET_OTHER_USER_POSTS,
  CLEAR_OTHER_USER_POSTS,
  LOGGED_USER_LIKE_POST,
  LOGGED_USER_ADD_COMMENT,
  LOGGED_USER_REMOVE_COMMENT,
  OTHER_USER_LIKE_POST,
  OTHER_USER_ADD_COMMENT,
  OTHER_USER_REMOVE_COMMENT,
  SET_LOGGED_USER_FRIENDS,
  CLEAR_LOGGED_USER_FRIENDS,
  SET_OTHER_USER_FRIENDS,
  CLEAR_OTHER_USER_FRIENDS,
  SET_PROFILE_ERROR,
  CLEAR_PROFILE_ERROR,
  SET_PROFILE_LOADING,
  CLEAR_PROFILE_LOADING,
  SET_PENDING_FRIEND_REQUESTS,
  CLEAR_PENDING_FRIEND_REQUESTS,
  REMOVE_FRIEND,
  ADD_FRIEND,
  SET_SENT_REQUESTS,
  CLEAR_SENT_REQUESTS,
  WITHDRAW_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  DECLINE_FRIEND_REQUEST,
  CLEAR_ALL_PROFILE,
  UPDATE_POST,
  DELETE_OTHER_USER_POST,
  DISABLE_OTHER_USER_POST,
  ENABLE_OTHER_USER_POST,
} from "../types";

const profileReducer = (state, action) => {
  switch (action.type) {
    case SET_LOGGED_USER_PROFILE:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          profile: action.payload,
        },
      };
    case CLEAR_LOGGED_USER_PROFILE:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          profile: null,
        },
      };
    case SET_OTHER_USER_PROFILE:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          profile: action.payload,
        },
      };
    case CLEAR_OTHER_USER_PROFILE:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          profile: null,
        },
      };

    case SET_LOGGED_USER_POSTS:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          posts: action.payload,
        },
      };
    case DELETE_LOGGED_USER_POST:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          posts: state.loggedUser.posts.filter(post => post._id != action.payload)
        }
      }
    case DELETE_OTHER_USER_POST:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          posts: state.otherUser.posts.filter(post => post._id != action.payload)
        }
      }
    case DISABLE_OTHER_USER_POST:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          posts: state.otherUser.posts.map(post => {
            if(post._id == action.payload){
              post.isDisabled = true;
            }
            return post;
          })
        }
      }
    case ENABLE_OTHER_USER_POST:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          posts: state.otherUser.posts.map(post => {
            if(post._id == action.payload){
              post.isDisabled = false;
            }
            return post;
          })
        }
      }

    case CLEAR_LOGGED_USER_POSTS:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          posts: [],
        },
      };

    case UPDATE_POST:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          posts: state.loggedUser.posts.map(post => {
            if(post._id == action.payload.postId){
              return action.payload.post;
            }
            return post
          })
        }
      }

    case SET_OTHER_USER_POSTS:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          posts: action.payload,
        },
      };
    case CLEAR_OTHER_USER_POSTS:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          posts: [],
        },
      };

    case SET_LOGGED_USER_FRIENDS:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          friends: action.payload,
        },
      };
    case CLEAR_LOGGED_USER_FRIENDS:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          friends: [],
        },
      };
    case SET_OTHER_USER_FRIENDS:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          friends: action.payload,
        },
      };
    case CLEAR_OTHER_USER_FRIENDS:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          friends: [],
        },
      };

    case ADD_FRIEND:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          sentFriendRequests: [...state.loggedUser.sentFriendRequests, {user: action.payload}]
        },
      };
      
    case SET_SENT_REQUESTS:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          sentFriendRequests: action.payload,
        },
      };
    case CLEAR_SENT_REQUESTS:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          sentFriendRequests: [],
        },
      };
    case WITHDRAW_FRIEND_REQUEST:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          sentFriendRequests: state.loggedUser.sentFriendRequests.filter(
            (request) => request.user._id != action.payload
          ),
        },
      };
    case ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          friendRequests: state.loggedUser.friendRequests.filter(request => request.user._id != action.payload._id),
          friends: [...state.loggedUser.friends, {user: action.payload}]
        }
      }
    case DECLINE_FRIEND_REQUEST:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          friendRequests: state.loggedUser.friendRequests.filter(request => request.user._id != action.payload)
        }
      }

    case SET_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_PROFILE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_PROFILE_ERROR:
      return {
        ...state,
        error: null,
      };

    case LOGGED_USER_LIKE_POST:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          posts: state.loggedUser.posts.map((post) => {
            if (post._id == action.payload.postId) {
              post.likes = action.payload.likes;
            }
            return post;
          }),
        },
      };

    case LOGGED_USER_ADD_COMMENT:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          posts: state.loggedUser.posts.map((post) => {
            if (post._id == action.payload.postId) {
              post.comments.push(action.payload.comment);
            }
            return post;
          }),
        },
      };

    case LOGGED_USER_REMOVE_COMMENT:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          posts: state.loggedUser.posts.map((post) => {
            if (post._id == action.payload.postId) {
              post.comments = post.comments.filter(
                (comment) => comment._id != action.payload.commentId
              );
            }
            return post;
          }),
        },
      };

    case OTHER_USER_LIKE_POST:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          posts: state.otherUser.posts.map((post) => {
            if (post._id == action.payload.postId) {
              post.likes = action.payload.likes;
            }
            return post;
          }),
        },
      };

    case OTHER_USER_ADD_COMMENT:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          posts: state.otherUser.posts.map((post) => {
            if (post._id == action.payload.postId) {
              post.comments.push(action.payload.comment);
            }
            return post;
          }),
        },
      };

    case OTHER_USER_REMOVE_COMMENT:
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          posts: state.otherUser.posts.map((post) => {
            if (post._id == action.payload.postId) {
              post.comments = post.comments.filter(
                (comment) => comment._id != action.payload.commentId
              );
            }
            return post;
          }),
        },
      };

    case SET_PENDING_FRIEND_REQUESTS:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          friendRequests: action.payload,
        },
      };
    case CLEAR_PENDING_FRIEND_REQUESTS:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          friendRequests: [],
        },
      };
    case REMOVE_FRIEND:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          friends: state.loggedUser.friends.filter(
            (friend) => friend.user._id != action.payload
          ),
        },
        otherUser: {
          ...state.otherUser,
          friends: state.otherUser.friends.filter(
            (friend) => friend.user._id != state.loggedUser.profile._id
          ),
        }
      };
    case CLEAR_ALL_PROFILE:
      return {
        ...action.payload
      }
    default:
      return {
        ...state,
      };
  }
};

export default profileReducer;
