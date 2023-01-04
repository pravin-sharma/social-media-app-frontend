import React, { useContext, useReducer } from "react";
import ProfileContext from "./profileContext";
import profileReducer from "./profileReducer";
import {
  SET_LOGGED_USER_PROFILE,
  CLEAR_LOGGED_USER_PROFILE,
  SET_OTHER_USER_PROFILE,
  CLEAR_OTHER_USER_PROFILE,
  SET_LOGGED_USER_POSTS,
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
  SET_PENDING_FRIEND_REQUESTS,
  CLEAR_PENDING_FRIEND_REQUESTS,
  SET_PROFILE_ERROR,
  CLEAR_PROFILE_ERROR,
  SET_PROFILE_LOADING,
  CLEAR_PROFILE_LOADING,
  ADD_FRIEND,
  ACCEPT_FRIEND_REQUEST,
  REMOVE_FRIEND,
  WITHDRAW_FRIEND_REQUEST,
  SET_SENT_REQUESTS,
  CLEAR_SENT_REQUESTS,
  DECLINE_FRIEND_REQUEST,
  DELETE_LOGGED_USER_POST,
  CLEAR_ALL_PROFILE,
  UPDATE_POST,
  DELETE_OTHER_USER_POST,
  DISABLE_OTHER_USER_POST,
  ENABLE_OTHER_USER_POST,
} from "../types";
import axios from "axios";
import alertContext from "../alert/alertContext";
import authContext from "../auth/authContext";

const ProfileState = (props) => {
  const initialState = {
    loggedUser: {
      profile: null,
      friends: [],
      friendRequests: [],
      sentFriendRequests: [],
      posts: [],
    },
    otherUser: {
      profile: null,
      friends: [],
      posts: [],
    },
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { setAlert } = useContext(alertContext);
  const {user} = useContext(authContext);

  // get logged user profile
  const getLoggedUserProfile = async (userProfileId) => {
    try {
      const res = await axios.get(`/user/${userProfileId}`);
      dispatch({ type: SET_LOGGED_USER_PROFILE, payload: res.data.user });
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  //update logged user profile
  const updateLoggedUserProfile = async (userInfo) => {
    const { file } = userInfo;
    try {
      setProfileLoading();
      if (file) {
        const uploadUrl =
          "https://api.cloudinary.com/v1_1/dn6etipht/image/upload";
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "SocialMedia");

        const res = await fetch(uploadUrl, {
          method: "POST",
          body: data,
        });

        const media = await res.json();
        userInfo.profilePicUrl = media.url;
      }

      const res = await axios.put("/user", userInfo);
      dispatch({ type: SET_LOGGED_USER_PROFILE, payload: res.data?.user });

      setAlert(res.data.message, "success");
      clearProfileLoading();
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error?.response?.data?.message,
      });
      clearProfileLoading();
    }
  };

  // clear logged user profile
  const clearLoggedUserProfile = () => {
    dispatch({ type: CLEAR_LOGGED_USER_PROFILE });
  };

  // get other user's profile
  const getOtherUserProfile = async (userProfileId) => {
    try {
      const res = await axios.get(`/user/${userProfileId}`);
      dispatch({ type: SET_OTHER_USER_PROFILE, payload: res.data.user });
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // clear other user's profile
  const clearOtherUserProfile = () => {
    dispatch({ type: CLEAR_OTHER_USER_PROFILE });
  };

  // set loading
  const setProfileLoading = () => {
    dispatch({ type: SET_PROFILE_LOADING });
  };

  // clear loading
  const clearProfileLoading = () => {
    dispatch({ type: CLEAR_PROFILE_LOADING });
  };

  // posts - logged user
  const getLoggedUserPosts = async (userProfileId) => {
    try {
      const res = await axios.get(`/post/all/${userProfileId}`);
      dispatch({ type: SET_LOGGED_USER_POSTS, payload: res.data.posts });
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // delete post of logged user by id
  const deleteLoggedUserPost = async (postId) => {
    try {
      const res = await axios.delete(`/post/${postId}`);
      if(user.role === 'admin'){
        dispatch({ type: DELETE_OTHER_USER_POST, payload: postId });
      }else{
        dispatch({ type: DELETE_LOGGED_USER_POST, payload: postId });
      }
      setAlert(res.data.message, "success");
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // disable post
  const disablePost = async(postId) =>{
    try {
      const res = await axios.get(`/post/disable/${postId}`);
        dispatch({ type: DISABLE_OTHER_USER_POST, payload: postId });
        setAlert(res.data.message, "success");
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  }

  //enable post
  const enablePost = async(postId) =>{
    try {
      const res = await axios.get(`/post/enable/${postId}`);
        dispatch({ type: ENABLE_OTHER_USER_POST, payload: postId });
        setAlert(res.data.message, "success");
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  }

  // clear posts - logged user
  const clearLoggedUserPosts = () => {
    dispatch({ type: CLEAR_LOGGED_USER_POSTS });
  };

  // posts - other user
  const getOtherUserPosts = async (userProfileId) => {
    try {
      const res = await axios.get(`/post/all/${userProfileId}`);
      dispatch({ type: SET_OTHER_USER_POSTS, payload: res.data.posts });
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // clear posts - other user
  const clearOtherUserPosts = () => {
    dispatch({ type: CLEAR_OTHER_USER_POSTS });
  };

  // Friends - Logged user
  const getLoggedUserFriends = async (userProfileId) => {
    try {
      const res = await axios.get(`/friend/all/${userProfileId}`);
      dispatch({ type: SET_LOGGED_USER_FRIENDS, payload: res.data.friends });
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Clear Friends - Logged User
  const clearLoggedUserFriends = () => {
    dispatch({ type: CLEAR_LOGGED_USER_FRIENDS });
  };

  // Friends - Other user
  const getOtherUserFriends = async (userProfileId) => {
    try {
      const res = await axios.get(`/friend/all/${userProfileId}`);
      dispatch({ type: SET_OTHER_USER_FRIENDS, payload: res.data.friends });
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Clear Friends - Other User
  const clearOtherUserFriends = () => {
    dispatch({ type: CLEAR_OTHER_USER_FRIENDS });
  };

  // Send Request
  const addUserAsFriend = async (userId) => {
    const payload = {
      to: userId,
    };
    try {
      const res = await axios.post(`/friend`, payload);
      dispatch({
        type: ADD_FRIEND,
        payload: res.data.userToWhichRequestIsSent,
      });
      setAlert(res.data.message, "success");
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Get Sent Requests
  const getSentRequests = async () => {
    try {
      const res = await axios.get(`/friend/sentRequests`);
      dispatch({
        type: SET_SENT_REQUESTS,
        payload: res.data.sentFriendRequests,
      });
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };
  // Clear Sent Requests
  const clearSentRequests = async () => {
    try {
      const res = await axios.get(`/friend`);
      dispatch({ type: CLEAR_SENT_REQUESTS });
      setAlert(res.data.message, "success");
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Withdraw request
  const withdrawFriendRequest = async (userId) => {
    try {
      const res = await axios.delete(`/friend/withDraw/${userId}`);
      dispatch({ type: WITHDRAW_FRIEND_REQUEST, payload: userId });
      setAlert(res.data.message, "success");
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Get Friend Requests - All
  const getFriendRequests = async (userId) => {
    try {
      const res = await axios.get(`/friend/requests`);
      dispatch({
        type: SET_PENDING_FRIEND_REQUESTS,
        payload: res.data.friendRequests,
      });
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Clear Friend Requests
  const clearFriendRequests = async (userId) => {
    dispatch({
      type: CLEAR_PENDING_FRIEND_REQUESTS,
    });
  };

  // Accept friend request
  const acceptFriendRequest = async (userId) => {
    let payload = {
      requesterUserId: userId,
    };
    try {
      const res = await axios.post("/friend/accept", payload);
      dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: res.data.newFriend });
      setAlert(res.data.message, "success");
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Decline friend request
  const declineFriendRequest = async (userId) => {
    try {
      const res = await axios.delete(`/friend/decline/${userId}`);
      dispatch({ type: DECLINE_FRIEND_REQUEST, payload: userId });
      setAlert(res.data.message, "success");
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Remove a friend
  const removeFriend = async (friendId) => {
    try {
      await axios.delete(`/friend/remove/${friendId}`);
      dispatch({ type: REMOVE_FRIEND, payload: friendId });
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // clear error
  const clearProfileError = () => {
    dispatch({ type: CLEAR_PROFILE_ERROR });
  };

  // like a post
  const likePost = async (postId, doesProfileBelongsToLoggedUser) => {
    try {
      const res = await axios.get(`/post/like/${postId}`);
      if (doesProfileBelongsToLoggedUser) {
        dispatch({
          type: LOGGED_USER_LIKE_POST,
          payload: { likes: res.data.likes, postId },
        });
      } else {
        dispatch({
          type: OTHER_USER_LIKE_POST,
          payload: { likes: res.data.likes, postId },
        });
      }
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // add a comment
  const addComment = async (
    postId,
    comment,
    doesProfileBelongsToLoggedUser
  ) => {
    try {
      const res = await axios.post(`/post/comment/${postId}`, {
        text: comment,
      });

      if (doesProfileBelongsToLoggedUser) {
        dispatch({
          type: LOGGED_USER_ADD_COMMENT,
          payload: { postId, comment: res.data.comment },
        });
      } else {
        dispatch({
          type: OTHER_USER_ADD_COMMENT,
          payload: { postId, comment: res.data.comment },
        });
      }
      setAlert(res.data.message, "success");
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
      setAlert(error.response.data.message, "danger");
    }
  };

  // remove a comment
  const removeComment = async (
    postId,
    commentId,
    doesProfileBelongsToLoggedUser
  ) => {
    try {
      const res = await axios.delete(`/post/comment/${postId}/${commentId}`);

      if (doesProfileBelongsToLoggedUser) {
        dispatch({
          type: LOGGED_USER_REMOVE_COMMENT,
          payload: { postId, commentId },
        });
      } else {
        dispatch({
          type: OTHER_USER_REMOVE_COMMENT,
          payload: { postId, commentId },
        });
      }
      setAlert(res.data.message, "success");
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.message,
      });
      setAlert(error.response.data.message, "danger");
    }
  };

  const clearAllProfile = () => {
    dispatch({ type: CLEAR_ALL_PROFILE, payload: initialState });
  };

  //update post
  const updatePost = async (postId, postContent) => {
    try {
      const res = await axios.put(`/post/${postId}`, postContent);
      dispatch({
        type: UPDATE_POST,
        payload: { postId, post: res.data?.post },
      });

      setAlert(res.data.message, "success");
      clearProfileLoading();
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error?.response?.data?.message,
      });
      clearProfileLoading();
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        loggedUserProfile: state.loggedUser.profile,
        otherUserProfile: state.otherUser.profile,

        loggedUserPosts: state.loggedUser.posts,
        otherUserPosts: state.otherUser.posts,

        loggedUserFriends: state.loggedUser.friends,
        otherUserFriends: state.otherUser.friends,

        loggedUserFriendRequests: state.loggedUser.friendRequests,

        sentFriendRequests: state.loggedUser.sentFriendRequests,

        error: state.error,
        loading: state.loading,

        getLoggedUserProfile,
        clearLoggedUserProfile,
        getOtherUserProfile,
        clearOtherUserProfile,
        getLoggedUserPosts,
        updatePost,
        clearLoggedUserPosts,
        getOtherUserPosts,
        clearOtherUserPosts,
        getLoggedUserFriends,
        getOtherUserFriends,
        clearLoggedUserFriends,
        clearOtherUserFriends,
        getFriendRequests,
        likePost,
        addComment,
        removeComment,
        addUserAsFriend,
        getSentRequests,
        clearSentRequests,
        withdrawFriendRequest,
        removeFriend,
        acceptFriendRequest,
        declineFriendRequest,
        updateLoggedUserProfile,
        setProfileLoading,
        clearProfileLoading,
        clearProfileError,
        deleteLoggedUserPost,
        clearAllProfile,
        disablePost,
        enablePost
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
